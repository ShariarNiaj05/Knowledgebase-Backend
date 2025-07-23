import { fileUploader } from "../../../helpers/fileUploader";
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.get(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.RegularUser),
  userController.getAllUser
);

router.patch(
  "/update-my-profile",
  auth(UserRole.SUPER_ADMIN, UserRole.RegularUser),
  fileUploader.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    // req.body = userValidation.createPatient.parse(JSON.parse(req.body.data));
    req.body = JSON.parse(req.body.data);
    return userController.updateMyProfile(req, res, next);
  }
);

export const userRoutes = router;
