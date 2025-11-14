const crypto=require('crypto')
const Usermodel=require("../model/user")
const factory=require('./handlers')
const ApiError=require('../middleware/apierror')
const asynchandler = require('express-async-handler');
const jwt=require('jsonwebtoken')
const bcrypt=require('bcrypt');
const usermodel = require('../model/user');
const sendemail=require('../utils/sendemail')
const createtoken=require('../utils/createtoken')
const {sanitizeUser}=require('../utils/sanitize')
//generate token

//sign up
exports.signup= asynchandler(async (req, res, next) => {
     const user=await Usermodel.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password, 
      });
    const token=createtoken(user._id);
     
     res.status(201).json({data:sanitizeUser(user),token})
  });


//login
exports.login= asynchandler(async (req, res, next) => {
    
   const user=await Usermodel.findOne({email:req.body.email});
   if (!user||!(await bcrypt.compare(req.body.password,user.password))) {
      throw new Error(" invalid login ");
   }
    const tokenn =createtoken(user._id);


     res.status(200).json({data:sanitizeUser(user),tokenn})
  });


// protect operation of admin
exports.protect = asynchandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new ApiError('You are not logged in, please log in first', 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
  const current = await Usermodel.findById(decoded.userId);

  if (!current) {
    return next(new ApiError('The user belonging to this token no longer exists', 401));
  }

  //pass changed after token created
  let passchangedtimestamp;
  if (current.passwordChangedAt) {
    passchangedtimestamp = parseInt(current.passwordChangedAt.getTime() / 1000, 10);
  }

  if (passchangedtimestamp && passchangedtimestamp > decoded.iat) {
    return next(new ApiError('User changed password, please log in again', 401));
  }

  req.user = current;
  next();
});


//allowed people to use crud
exports.allowedTo=(...roles)=>asynchandler(async (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new ApiError('You are not allwoed to access this', 403));

  }
   next();


});


// Forget Password
exports.forgetpassword = asynchandler(async (req, res, next) => {
  const user = await Usermodel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError('There is no user for this email', 404));
  }

  // Generate reset code
  const resetcode = Math.floor(100000 + Math.random() * 900000).toString();

  // Hash the code
  const hashedresetcode = crypto
    .createHash('sha256')
    .update(resetcode)
    .digest('hex');

  // Save data to user document
  user.passwordresetcode = hashedresetcode;
  user.passwordresetcodeexpires = Date.now() + 10 * 60 * 1000; // 10 minutes
  user.passwordresetverified = false;

  await user.save();

  // Email message
  const msg = `Hi ${user.name},
Here are three easy ways to get back into your account.
Use this code in the app to reset your password:
${resetcode}
This code is valid for 10 minutes.
`;

  // Send email
  try {
    
    await sendemail({
    email: user.email,
    subject: 'Your password reset code (valid for 10 min)',
    message: msg,
  });

  } catch (error) {
    user.passwordresetcode = undefined;
  user.passwordresetcodeexpires = undefined
  user.passwordresetverified = undefined;
  await user.save();
  return next(new ApiError("there is an error in sending email",500))
  }

  res
    .status(200)
    .json({ status: 'success', message: 'Reset code sent to email' });
});




//virify reset code
exports.verifyPassResetCode = asynchandler(async (req, res, next) => {
  // 1) Get user based on reset code
  const hashedResetCode = crypto
    .createHash('sha256')
    .update(req.body.resetCode)
    .digest('hex');

  const user = await Usermodel.findOne({
    passwordresetcode: hashedResetCode,
    passwordresetcodeexpires: { $gt: Date.now() },
  });
  if (!user) {
    return next(new ApiError('Reset code invalid or expired'));
  }

  // 2) Reset code valid
  user.passwordresetverified = true;
  await user.save();

  res.status(200).json({
    status: 'Success',
  });
});



//reset code
exports.resetPassword = asynchandler(async (req, res, next) => {
  // 1) Get user based on email
  const user = await Usermodel.findOne({ email: req.body.email });
  if (!user) {
    return next(
      new ApiError(`There is no user with email ${req.body.email}`, 404)
    );
  }

  // 2) Check if reset code verified
  if (!user.passwordresetverified) {
    return next(new ApiError('Reset code not verified', 400));
  }

  user.password = req.body.newPassword;
  user.passwordresetcode = undefined;
  user.passwordresetcodeexpires = undefined;
  user.passwordresetverified = undefined;

  await user.save();

  // 3) if everything is ok, generate token
  const token = createToken(user._id);
  res.status(200).json({ token });
});