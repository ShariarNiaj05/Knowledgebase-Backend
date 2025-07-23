import { NextFunction, Request, Response } from "express";
import status from "http-status";

const apiNotFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(status.NOT_FOUND).json({
    success: false,
    message: "API Not Found",
    error: {
      path: req.originalUrl,
    },
  });
};

export default apiNotFound;
