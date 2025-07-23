import { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { ArticleService } from "./article.service";

const createRegularUser = catchAsync(async (req: Request, res: Response) => {
  const result = await ArticleService.createArticle(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Articles Created Successfully!",
    data: result,
  });
});

export const ArticleController = {
  createRegularUser,
};
