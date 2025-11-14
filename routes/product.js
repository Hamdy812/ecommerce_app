const express = require("express");
const { addproduct, getall,getoneproduct,updateproduct ,deleteproduct} = require("../controllers/product");
const router = express.Router();
const { getProductValidator,createProductValidator,updateProductValidator,deleteProductValidator } = require('../validators/productvalidator');


router.route("/")
.get(getall)
.post(createProductValidator,addproduct);


router.route('/:id')
.get( getProductValidator, getoneproduct)
.put(updateProductValidator,updateproduct)
.delete(deleteProductValidator,deleteproduct)

module.exports = router;
