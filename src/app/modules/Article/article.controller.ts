import { Request, Response } from "express";

import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import { ArticleService } from "./article.service";
import { IAuthUser } from "../../interfaces/common";

const createArticles = catchAsync(
  async (req: Request & { user?: IAuthUser }, res: Response) => {
    const user = req.user as IAuthUser;
    const result = await ArticleService.createArticle(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Articles Created Successfully!",
      data: result,
    });
  }
);

export const ArticleController = {
  createArticles,
};
