const mongoose=require("mongoose")

const brandschema=mongoose.Schema({
    name:{
       type: String,
       required:[true,'brand Required'],
       unique:[true,"brand must be unique"],
       minlength:[3,"too short brand"],
       maxlength:[30,"too short brand"],

    },
    slug:{
       type: String,
       lowercase:true,

    },
    image:String,

},{timestamps:true});

const brandmodel=mongoose.model("brand",brandschema)

module.exports= brandmodel;