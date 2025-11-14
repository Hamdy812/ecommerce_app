const Categorymodel=require("../model/categories")
const factory=require('./handlers')

//get all category
exports.getall =factory.getAll(Categorymodel)


//get specific category
exports.getonecategory = factory.getOne(Categorymodel)


//create category
exports.addcategory=factory.createOne(Categorymodel)


//update category
exports.updatecategory = factory.updateOne(Categorymodel);



//delete category
exports.deletecategory = factory.deleteOne(Categorymodel);