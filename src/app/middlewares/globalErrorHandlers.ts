import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import status from "http-status";

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = status.INTERNAL_SERVER_ERROR;
  let success = false;
  let message = err.message ?? "Something Went Wrong";
  let error = err;

  if (error instanceof Prisma.PrismaClientValidationError) {
    message = "Validation Error";
    error = err;
  } else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") {
      message = "Duplicate Key Error";
      error = err.meta;
    }
  }

  res.status(statusCode).json({
    success,
    message,
    error,
  });
};

export default globalErrorHandler;
