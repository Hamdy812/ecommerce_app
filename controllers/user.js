const Usermodel=require("../model/user")
const factory=require('./handlers')
const ApiError=require('../middleware/apierror')
const asynchandler = require('express-async-handler');
const bcrypt=require('bcrypt')
const createtoken=require('../utils/createtoken')


//get all users(private)
exports.getallUsers= factory.getAll(Usermodel);

//get specific User(private)
exports.getoneUser =factory.getOne(Usermodel);

//create User(private)
exports.addUser =factory.createOne(Usermodel);


//update User(private)
exports.updateUser =  asynchandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, {

        name:req.body.name,
        slug:req.body.slug,
        phone:req.body.phone,
        email:req.body.email,
        role:req.body.role,

    }, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document found for id ${req.params.id}`, 404));
    }

    res.status(200).json({ data: document });
  });


// update and change password
  exports.changeUserPassword= asynchandler(async (req, res, next) => {
            const salt = await bcrypt.genSalt(10);

    const document = await Usermodel.findByIdAndUpdate(req.params.id, {
        password: await bcrypt.hash(req.body.password,salt),
        passwordchangedAt:Date.now(),

    }, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document found for id ${req.params.id}`, 404));
    }

    res.status(200).json({ data: document });
  });



//delete User(private)
exports.deleteUser = factory.deleteOne(Usermodel);


// get logged user data
exports.getmydata =asynchandler(async (req, res, next) => {
   req.params.id=req.user._id;
   next();
  });


  
// update logged user password
exports.updateuserpassword =asynchandler(async (req, res, next) => {
    const user = await Usermodel.findByIdAndUpdate(req.user.id, {
        password: await bcrypt.hash(req.body.password,salt),
        passwordchangedAt:Date.now(),

    }, {
      new: true,
    });
    const generatetoken=createtoken(user._id);   
    res.status(200).json({ data: user,generatetoken });
  });

  
  
// update logged user data
exports.updateuserdata =asynchandler(async (req, res, next) => {
    const user = await Usermodel.findByIdAndUpdate
    (req.user.id, 
      {
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
    }, {
      new: true,
    });
    res.status(200).json({ data: user,generatetoken });
  });

  
  //delete user data
  exports.deleteLoggedUserData = asynchandler(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  res.status(204).json({ status: 'Success' });
});