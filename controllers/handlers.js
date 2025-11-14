const asynchandler=require('express-async-handler')
const ApiError = require("../middleware/apierror");
const Apifeatures=require('../utils/apifeatures/apifeatur');
const { Model } = require('mongoose');

//delete handler(Generic)
exports.deleteOne = (Model) =>
  asynchandler(async (req, res, next) => {
    const { id } = req.params;

    const document = await Model.findByIdAndDelete(id);

    if (!document) {
      return next(new ApiError(`No document found for id ${id}`, 404));
    }

    res.status(200).json({ data: document });
  });

// update handler (Generic)
exports.updateOne = (Model) =>
  asynchandler(async (req, res, next) => {
    const document = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!document) {
      return next(new ApiError(`No document found for id ${req.params.id}`, 404));
    }

    res.status(200).json({ data: document });
  });

// create handler (Generic)
exports.createOne = (Model) =>
  asynchandler(async (req, res) => {
    const document = await Model.create(req.body);
    res.status(201).json({ data: document });
  });

  //get one handler
  exports.getOne=(Model)=>
      asynchandler(async (req, res,next) => {

    const { id } = req.params;

    const document = await Model.findById(id);

    if (!document) {
    return next(new ApiError( `No document found for id ${id}`,404));
    }

    res.status(200).json({ data: document });
  });


    //get all handler
    exports.getAll=(Model)=>asynchandler(async(req, res) => {

    let filter={};
    if (req.filterObj) {
      filter=req.filterObj
    }
    const count=await Model.countDocuments();
    const apifeature=new Apifeatures(Model.find(filter),req.query)
    .paginitaion(count)
    .filter()
    .search()
    .limitField()
    .sort();

    const {mongosequery,paginatresult}=apifeature;
    const document = await mongosequery

      res.status(200).json({result:document.length,paginatresult,data:document});

});

