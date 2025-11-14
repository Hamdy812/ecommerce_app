const { param, check,body } = require('express-validator');
const validatorMiddleware = require('../middleware/validator');
const { default: slugify } = require('slugify');
const UserModel=require('../model/user')
const bcrypt=require('bcrypt')

exports.getUserValidator = [
    param('id').isMongoId().withMessage('Invalid User id'),
    validatorMiddleware
];

exports.createUserValidator = [
  check('name')
    .notEmpty().withMessage('User name is required')
    .isLength({ min: 3 }).withMessage('User name is too short')
    .isLength({ max: 30 }).withMessage('User name is too long')
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),

  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email')
    .custom((val) => {
      return UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already used'));
        }
      });
    }),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6})
    .withMessage('short password').custom((password,{req})=>{
        if (password!==req.body.passwordConfirm) {
            throw new Error('Password confirmation not correct');
        }
        return true;
    }),


    check('passwordConfirm')
    .notEmpty()
    .withMessage('password confirm is required'),

     check('phone')
    .optional()
    .isMobilePhone('ar-EG').withMessage('invalid phone number,only accept egypt phone numbers'),


    check('role').optional(),

  validatorMiddleware,
];


exports.updateUserValidator = [
    param('id').isMongoId().withMessage('Invalid User id'),

  // Validate name and create slug
  body('name').optional().custom((val, { req }) => {
    req.body.slug = slugify(val);
    return true;
  }),

  // Validate email
  body('email')
    .optional()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email')
    .custom((val) => {
      return UserModel.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('Email already used'));
        }
      });
    }),
     check('phone')
    .optional()
    .isMobilePhone('ar-EG').withMessage('invalid phone number,only accept egypt phone numbers'),


    check('role').optional(),


  // Apply validator middleware
  validatorMiddleware
];
exports.deleteUserValidator = [
    param('id').isMongoId().withMessage('Invalid User id'),
    validatorMiddleware
];


exports.changepasswordUserValidator = [
    body('currentpassword').notEmpty().withMessage('you must enter current password'),
    body('passwordconfirm').notEmpty().withMessage('you must enter confirm password'),
    body('password').notEmpty().withMessage('you must enter password').custom(async(val,{req})=>{

      const user=await user.findById(req.params.id)
      if (!user) {
        throw new Error("there is no user for this id");
      }
      
      const iscorrectpass=await bcrypt.compare(req.body.currentpassword,use.password)
       if (!iscorrectpass) {
        throw new Error("incorrect  current password");
       }

      
        if (password!==req.body.passwordConfirm) {
            throw new Error('Password confirmation not correct');
        }
        return true;
    }),

 
    validatorMiddleware
];


exports.updateLoggedUserValidator = [
  body('name')
    .optional()
    .custom((val, { req }) => {
      req.body.slug = slugify(val);
      return true;
    }),
  check('email')
    .notEmpty()
    .withMessage('Email required')
    .isEmail()
    .withMessage('Invalid email address')
    .custom((val) =>
      User.findOne({ email: val }).then((user) => {
        if (user) {
          return Promise.reject(new Error('E-mail already in user'));
        }
      })
    ),
  check('phone')
    .optional()
    .isMobilePhone(['ar-EG', 'ar-SA'])
    .withMessage('Invalid phone number only accepted Egy and SA Phone numbers'),

  validatorMiddleware,
];