const { body, validationResult, param, check } = require('express-validator');
const validatorMiddleware = require('../middleware/validator');
const { default: slugify } = require('slugify');

exports.getCategoryValidator = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];


exports.createCategory = [
    check('name').notEmpty().withMessage('Category requierd')
    .isLength({min:3}).withMessage('Category too short')
    .isLength({max:30}).withMessage('Category too long')
    .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    }),
    validatorMiddleware
];


exports.updateCategory = [
    body('name').custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    }),
    param('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
];



exports.deleteCategory = [
    check('id').isMongoId().withMessage('Invalid category id'),
    validatorMiddleware
];
