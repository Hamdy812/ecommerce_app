const { param, check,body } = require('express-validator');
const validatorMiddleware = require('../middleware/validator');
const { default: slugify } = require('slugify');

exports.getBrandValidator = [
    param('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
];

exports.createBrandValidator = [
    check('name')
        .notEmpty().withMessage('Brand name is required')
        .isLength({ min: 3 }).withMessage('Brand name is too short')
        .isLength({ max: 30 }).withMessage('Brand name is too long')
        .custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    }),
    validatorMiddleware
];

exports.updateBrandValidator = [
    body('name').custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    }),
    param('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
];

exports.deleteBrandValidator = [
    param('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
];
