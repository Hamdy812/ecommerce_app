const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const userschmea=mongoose.Schema({
    name:{
       type: String,
       trim:true,
       required:[true,'name Required'],
       minlength:[3,"too short name"],
       maxlength:[30,"too short name"],

    },
    slug:{
       type: String,
       lowercase:true,

    },
    email:{
         type: String,
       trim:true,
        required:[true,'Email Required'],
        unique:[true,'email must defiend once']

    },
    phone:String,
    password:{
        type:String,
         required:[true,'password Required'],
       minlength:[6,"too short password"],

    },

    passwordchangedAt:{type:Date,},
    passwordresetcode:{type:String,},
    passwordresetcodeexpires:{type:Date,},
    passwordresetverified:{type:Boolean,},
    role:{
       type: String,
       enum:['user','admin',"manger"],
       default:'user',
    },
    active:{
        type:Boolean,
        default:true,
    },

},{timestamps:true});

userschmea.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt=bcrypt.genSaltSync(10)
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const usermodel=mongoose.model("User",userschmea)

module.exports=usermodel;