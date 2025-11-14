const express = require("express");
const { addBrand, getallBrands,getoneBrand,updateBrand ,deleteBrand} = require("../controllers/brand");
const router = express.Router();
const { getBrandValidator,createBrandValidator,updateBrandValidator,deleteBrandValidator } = require('../validators/brandvalidator');

router.route("/")
.get(getallBrands)
.post(createBrandValidator,addBrand);


router.route('/:id')
.get(getBrandValidator, getoneBrand)
.put(updateBrandValidator,updateBrand)
.delete(deleteBrandValidator,deleteBrand)

module.exports = router;
