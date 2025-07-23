import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const createRegularUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createRegularUser(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "User Created Successfully!",
    data: result,
  });
});

export const userController = {
  createRegularUser,
};
