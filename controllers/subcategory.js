
const Subcategorymodel=require("../model/subcategory")

const factory=require('./handlers')

//middleware for create subcategory
exports.setcategoryidtobody=(req,res,next)=>{

  if (!req.body.category) {
    req.body.category=req.params.categoryId;
  }
  next();
}
// middleware for get all subcategory
exports.createfilterobjec = (req, res, next) => {
  let filterobject = {}; 

  if (req.params.categoryId) {
    filterobject = { category: req.params.categoryId };
  }

  req.filterobject = filterobject; 
  next();
};



//get all category
exports.getallsub = factory.getAll(Subcategorymodel)


//get specific category
exports.getonesubcategory = factory.getOne(Subcategorymodel)

//create category
exports.addsubcategory=factory.createOne(Subcategorymodel)


//update category
exports.updatesubcategory = factory.updateOne(Subcategorymodel);



//delete category
exports.deletesubcategory = factory.deleteOne(Subcategorymodel);