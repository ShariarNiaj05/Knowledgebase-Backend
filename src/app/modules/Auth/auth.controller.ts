import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);

  const { refreshToken } = result;

  res.cookie("refreshToken", refreshToken, {
    secure: false,
    httpOnly: true,
  });

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Logged in successful",
    data: {
      accessToken: result.accessToken,
      needPasswordChange: result.needPasswordChange,
    },
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Refresh Token Generated",
    data: result,
  });
});

const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    console.log(req.user, req.body);
    const result = await AuthService.changePassword(req.user, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password Changed Successfully",
      data: result,
    });
  }
);

const forgotPassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    await AuthService.forgotPassword(req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Check your email",
      data: null,
    });
  }
);
const resetPassword = catchAsync(
  async (req: Request & { user?: any }, res: Response) => {
    const token = req.headers.authorization ?? "";
    await AuthService.resetPassword(token, req.body);

    sendResponse(res, {
      statusCode: status.OK,
      success: true,
      message: "Password Reset",
      data: null,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
