const mongoose=require("mongoose")

const subcategoryschema=new mongoose.Schema({
    name:{
       type: String,
       trim:true,
       required:[true,'SubCategory Required'],
       unique:[true,"SubCategory must be unique"],
       minlength:[3,"too short SubCategory"],
       maxlength:[30,"too short SubCategory"],
     
    },
    slug:{
       type: String,
       lowercase:true,

    },

    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'SubCategory must be belong to parent category'],

    },


},{timestamps:true});
const subcregorymodel=mongoose.model("subcategory",subcategoryschema)

module.exports=subcregorymodel;