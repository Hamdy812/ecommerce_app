
const nodemailer=require('nodemailer')
const sendemail=async(options)=>{
   const transporter=nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,//if secure true=465 and false =587
    secure:true,
    auth:{
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASSWORD
    }
   });
  const mailoption={
    from:"E-shop APP<ibrahimelsaed405@gmail.com>",
    to:options.email,
    subject:options.subject,
    text:options.message,
  }
await transporter.sendMail(mailoption);
};

module.exports=sendemail;