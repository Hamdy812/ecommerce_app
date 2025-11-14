const Brandmodel=require("../model/brand")
const factory=require('./handlers')

//get all brand
exports.getallBrands = factory.getAll(Brandmodel)

//get specific brand
exports.getoneBrand =factory.getOne(Brandmodel)

//create brand
exports.addBrand =factory.createOne(Brandmodel)


//update brand
exports.updateBrand = factory.updateOne(Brandmodel);


//delete brand
exports.deleteBrand = factory.deleteOne(Brandmodel);

