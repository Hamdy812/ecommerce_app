const { param, check,body } = require('express-validator');
const validatorMiddleware = require('../middleware/validator');
const { default: slugify } = require('slugify');
const UserModel=require('../model/user')
const bcrypt=require('bcrypt')


exports.signupValidator = [
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

  validatorMiddleware,
];




exports.loginValidator = [
 
  check('email')
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Enter a valid email'),
    check('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({min:6})
    .withMessage('short password'),

  validatorMiddleware,
];

