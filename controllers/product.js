const Productmodel=require("../model/product")
const factory=require('./handlers')

//get all products
exports.getall = factory.getAll(Productmodel)

//get specific product
exports.getoneproduct = factory.getOne(Productmodel)

//create product(private)
exports.addproduct= factory.createOne(Productmodel)

//update product(private)
exports.updateproduct =factory.updateOne(Productmodel);

//delete product(private)
exports.deleteproduct =factory.deleteOne(Productmodel);