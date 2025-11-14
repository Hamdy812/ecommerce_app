const ApiError=require('./apierror')

// dev error response
const sendErrorForDev = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//  production error response
const sendErrorForProd = (err, res) => {
  res.status(err.statuscode).json({
    status: err.status,
    message: err.message,
  });
};

//handle invalid token
const handleJwtInvalidSignature = () => {
   return new ApiError('Invalid token, please log in again.',401);
}
// handle expired JWT token
const handleJwtExpired = () => {
  return new ApiError('Token expired, please log in again.', 401);
};


// Global Error Handler Middleware
const errorHandler = (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorForDev(err, res);
  } else {
    if (err.name === "JsonWebTokenError") {err = handleJwtInvalidSignature();}
    if (err.name === "TokenExpiredError") {err = handleJwtExpired();}

    sendErrorForProd(err, res);
  }
};

module.exports = errorHandler;
