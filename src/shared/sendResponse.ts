import { Response } from "express";

type TMeta = {
  page: number;
  limit: number;
  total: number;
};
const sendResponse = <T, X>(
  res: Response,
  jsonData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: TMeta | null;
    data?: T | null;
    error?: X | null;
  }
) => {
  res.status(jsonData.statusCode).json({
    success: jsonData.success,
    message: jsonData.message,
    meta: jsonData?.meta ?? null,
    data: jsonData.data ?? null,
    error: jsonData.error ?? null,
  });
};

export default sendResponse;
