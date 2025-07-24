import { fileUploader } from "../../../helpers/fileUploader";
import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
// import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/create-user",
  auth(UserRole.SUPER_ADMIN, UserRole.RegularUser),
  fileUploader.upload.single("file"),
  userController.createRegularUser
  // (req: Request, res: Response, next: NextFunction) => {
  //   // req.body = userValidation.createAdmin.parse(JSON.parse(req.body.data));
  //   return userController.createRegularUser(req, res, next);
  // }
);

export const userRoutes = router;
