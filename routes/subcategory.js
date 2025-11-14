const express = require("express");
const {addsubcategory,getonesubcategory,updatesubcategory,deletesubcategory,getallsub,setcategoryidtobody,createfilterobjec} = require("../controllers/subcategory");

const {getsubCategoryv,createSubcategoryv,updatesubCategoryv,deletesubCategoryv} = require("../validators/subcategoryvalidator");

const router = express.Router({mergeParams:true});

router.route("/")
  .get(createfilterobjec,getallsub)
  .post(setcategoryidtobody,createSubcategoryv, addsubcategory);



router.route("/:id")
  .get(getsubCategoryv, getonesubcategory)
  .put(updatesubCategoryv,updatesubcategory)
  .delete(deletesubCategoryv,deletesubcategory)

  
module.exports = router;
