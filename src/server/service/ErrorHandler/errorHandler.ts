import AppError from "./../../utils/AppError";
import express from "express";


export const sendErrorDev = (err: AppError, res: express.Response) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack
  });
};

export const sendErrorProd = (err: AppError, res: express.Response) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  } else {
    //console.error("sendErrorProd ", err);

    res.status(500).json({
      status: "error",
      message: "Something wrong"
    });
  }
};

export const handleCastErrorDB = (err: any) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};

export const handleValidationErrorDB = (err: any) => {
  const errors = Object.values(err.errors).map((el: any) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

export const handleDuplicateFieldsDB = (err: any) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. Please use another value`;
  return new AppError(message, 400);
};

export const handleJWTError = () =>
  new AppError(`Invalid token. Please login again`, 401);

export const handleJWTExpiredError = () =>
  new AppError(`Token has expired. Please login again`, 401);

export default (err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {

  //console.log("Error handler");

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = { ...err };

    if (error.name === "CastError") error = handleCastErrorDB(err);

    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);

    if (error.code === 11000) error = handleDuplicateFieldsDB(err);

    if (error.name === "JsonWebTokenError") error = handleJWTError();

    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};