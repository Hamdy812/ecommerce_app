const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/errorhandling");
const categoryroute = require("./routes/category");
const subcategoryroute=require('./routes/subcategory')
const Dbconnection = require("./DB/database");
const ApiError =require('./middleware/apierror')
const brandroute=require('./routes/brand')
const productroute=require('./routes/product')
const userroute=require('./routes/user')
const authroute=require('./routes/auth')
const ratelimiter=require("express-rate-limit")
const cors = require("cors");
const helmet = require("helmet");
const hpp=require('hpp')
const sanitize=require('express-mongo-sanitize')
dotenv.config({ path: "config.env" });
const port = process.env.PORT || 5000;
const app = express();
const stripesecretkey=process.env.SPRITE_SECRET_KEY;
const stripepublickey=process.env.SPRITE_PUBLIC_KEY;


// DB
Dbconnection();


// middleware
app.use(express.json({limit:"20kb"}));
app.use(sanitize());
app.use(helmet());
app.use(cors());


if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

const limiter=ratelimiter({
  windowMs:15*60*1000,
   max:100,
   message:'Too many request for this IP,try again after 15 minutes'
});

app.use("/api",limiter)
app.use(hpp());




// routes
app.use("/api/auth", authroute);
app.use("/api/user", userroute);
app.use("/api/brands", brandroute);
app.use("/api/product", productroute);
app.use("/api/subcategory", subcategoryroute);
app.use("/api/category", categoryroute);



// handle unknown routes
app.use((req, res, next) => {
  next(new ApiError (`Cant find this route ${req.originalUrl}`,400));
});


// global error handler
app.use(errorHandler);

// port
const server=app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});


process.on('unhandledRejection', (err) => {
      console.error(`Rejection error ${err.name} | ${err.message}`)
      server.close(()=>{
     console.error(`server shutting down....`)
      process.exit(1);

      }) 
})