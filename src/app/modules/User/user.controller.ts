import { Request, Response } from "express";
import { userService } from "./user.service";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import status from "http-status";
import pick from "../../../shared/pick";
import { userFilterAbleFields } from "./user.constant";
import { IAuthUser } from "../../interfaces/common";

const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createAdmin(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Admin Created Successfully!",
    data: result,
  });
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createDoctor(req);

  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Doctor Created Successfully!",
    data: result,
  });
});

const createPatient = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.createPatient(req);
  sendResponse(res, {
    statusCode: status.OK,
    success: true,
    message: "Patient Created successfully!",
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const filters = pick(req.query, userFilterAbleFields);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);

  const result = await userService.getAllUserFromDB(filters, options);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "User Retrieved Successfully",
    meta: result.meta,
    data: result.data,
  });
});
const changeProfileStatus = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await userService.changeProfileStatus(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: status.OK,
    message: "Profile Status Changed Successfully",
    // meta: result.meta,
    data: result,
  });
});
const getMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const user = req.user;

    const result = await userService.getMyProfile(user as IAuthUser);
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Profile Retrieved Changed Successfully",
      // meta: result.meta,
      data: result,
    });
  }
);
const updateMyProfile = catchAsync(
  async (req: Request & { user?: IAuthUser }, res) => {
    const user = req.user;
    const result = await userService.updateMyProfile(user as IAuthUser, req);
    sendResponse(res, {
      success: true,
      statusCode: status.OK,
      message: "Profile Updated Successfully",
      // meta: result.meta,
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getAllUser,
  changeProfileStatus,
  getMyProfile,
  updateMyProfile,
};
