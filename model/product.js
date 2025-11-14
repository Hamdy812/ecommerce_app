const { maxLength } = require('cookieparser')
const mongoose=require('mongoose')

const productschema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        maxlength:[90,"too long title"],
        minlength:[3,"too short title"],

    },

    slug:{
         type:String,
        required:true,
        lowercase:true,
    },

     description:{
         type:String,
        required:[true,"product description is required"],
         maxlength:[900,"too long description"],
        minlength:[10,"too short description"],

    },
    quantity:{
        type:Number,
        required:[true,"product quantity is required"],
         
    },

    sold:{
        type:Number,
        default:0,
    },
    
    price:{
        type:Number,
        required:true,
        trim:true,
        max:[200000,"too long price"],
    },

     priceAfterDiscount:{
        type:Number,
        trim:true,
    },

    colors:[String],

    imageCover:{
        type:String,
        required:[true,'product image is required']
    },

    image:[String],
    category:{
        type:mongoose.Schema.ObjectId,
        ref:'category',
        required:[true,'product must be of category']

    },

     category:[{
        type:mongoose.Schema.ObjectId,
        ref:'subcategory',
     }],

     brand:{
        type:mongoose.Schema.ObjectId,
        ref:'brand',

    },

    ratingAVG:{
       type:Number,
       min:[1,'rating must be above or equal 1'],
       max:[5,'rating must be under or equal 5']
    },

    ratingQuantity:{
       type:Number,
       default:0
    }

    
    
},{timestamps:true});

//mongoose midleware
productschema.pre(/^find/,function (next){
    this.populate({
        path:'category',
        select:'name -__id',
    })
    next();
})

module.exports=mongoose.model("product",productschema)