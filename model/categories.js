const mongoose=require("mongoose")

const categoryschema=mongoose.Schema({
    name:{
       type: String,
       required:[true,'Category Required'],
       unique:[true,"Category must be unique"],
       minlength:[3,"too short category"],
       maxlength:[30,"too short category"],

    },
    slug:{
       type: String,
       lowercase:true,

    },
    image:String,

},{timestamps:true});
const cregorymodel=mongoose.model("category",categoryschema)

module.exports=cregorymodel;