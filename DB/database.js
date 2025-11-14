const mongoose=require("mongoose")
const databaseconnection=()=>{
    
    mongoose
    .connect(process.env.URI)
    .then((conn)=>{
       console.log(`connected to DB ${conn.connection.host}`);
    
    }).catch((err)=>{
        console.error(`DB error ${err}`)
        process.exit(1);
    })
    
};
module.exports=databaseconnection