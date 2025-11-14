const { body, validationResult, param, check } = require('express-validator');
const validatorMiddleware = require('../middleware/validator');
const { default: slugify } = require('slugify');

exports.getsubCategoryv = [
    check('id').isMongoId().withMessage('Invalid subcategory id'),
    validatorMiddleware
];


exports.createSubcategoryv = [
    check('name').notEmpty().withMessage('subCategory requierd').custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    })
    .isLength({min:3}).withMessage('subCategory too short')
    .isLength({max:30}).withMessage('subCategory too long'),
    check('category').notEmpty().withMessage('Subcategory must be belong to category')
    .isMongoId().withMessage('invalid category id'),
    
    validatorMiddleware
];


exports.updatesubCategoryv = [
    body('name').custom((val,{req})=>{
        req.body.slug=slugify(val)
        return true;
    }),
    param('id').isMongoId().withMessage('Invalid brand id'),
    validatorMiddleware
];



exports.deletesubCategoryv = [
    check('id').isMongoId().withMessage('Invalid subcategory id'),
    validatorMiddleware
];
