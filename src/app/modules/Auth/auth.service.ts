import { jwtHelpers } from "./../../../helpers/jwtHelper";
import * as bcrypt from "bcrypt";
import prisma from "../../../shared/prisma";
import { UserStatus } from "@prisma/client";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import ApiError from "../../errors/ApiError";
import status from "http-status";
import emailSender from "./emailSender";

const loginUser = async (payload: { email: string; password: string }) => {
  const userData = await prisma.user.findUnique({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.password,
    userData!.password
  );
  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    config.jwt.refresh_token_secret as Secret,
    config.jwt.refresh_token_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData?.needPasswordChange,
  };
};

const refreshToken = async (token: string) => {
  let decodedData;
  try {
    decodedData = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_token_secret as Secret
    );

    console.log(decodedData);
  } catch (error) {
    throw new ApiError(status.UNAUTHORIZED, "You're not authorized");
    // throw new Error("You're not authorized");
  }
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: decodedData?.email,
      status: UserStatus.ACTIVE,
    },
  });

  const accessToken = jwtHelpers.generateToken(
    {
      email: userData?.email,
      role: userData?.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken,
    needPasswordChange: userData?.needPasswordChange,
  };
};

const changePassword = async (user: any, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const isCorrectPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  if (!isCorrectPassword) {
    throw new Error("password incorrect");
  }

  const hashedPassword: string = await bcrypt.hash(payload.newPassword, 10);

  await prisma.user.update({
    where: {
      email: userData.email,
      status: UserStatus.ACTIVE,
    },
    data: {
      password: hashedPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password Changed Successfully",
  };
};

const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPassToken = jwtHelpers.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt.RESET_PASS_TOKEN as Secret,
    config.jwt.RESET_PASS_TOKEN_EXPIRES_IN as string
  );

  const resetPassLink =
    config.RESET_PASS_LINK + `?userId=${userData.id}&token=${resetPassToken}`;

  await emailSender(
    userData.email,
    `
  <div>
    <p>Dear User</p>
    <p>
    Your reset password link
    
    <a href=${resetPassLink}>
    <button>Reset Password</button>
    </a>
    </p>
    
  </div>
  
    `
  );
  console.log(resetPassLink);
};

const resetPassword = async (
  token: string,
  payload: { id: string; password: string }
) => {
  console.log({ token, payload });

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });

  const isValidToken = jwtHelpers.verifyToken(
    token,
    config.jwt.RESET_PASS_TOKEN as Secret
  );

  if (!isValidToken) {
    throw new ApiError(status.FORBIDDEN, "FORBIDDEN");
  }

  // hash the password
  // update to db
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
