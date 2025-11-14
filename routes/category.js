const express = require("express");
const { addcategory, getall,getonecategory,updatecategory ,deletecategory} = require("../controllers/category");
const router = express.Router();
const { getCategoryValidator,createCategory,updateCategory,deleteCategory } = require('../validators/categoryvalidator');
const subCategoryRoute=require('./subcategory');
const Auth=require('../controllers/authuser')


router.use('/:categoryId/subcategory',subCategoryRoute)
router.use(Auth.protect,Auth.allowedTo('admin','manger'),)


router.route("/")
.get(getall)
.post(createCategory,addcategory);


router.route('/:id')
.get( getCategoryValidator, getonecategory)
.put(updateCategory,updatecategory)
.delete(deleteCategory,deletecategory)

module.exports = router;
