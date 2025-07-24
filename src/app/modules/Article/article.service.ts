import { IAuthUser } from "./../../interfaces/common";
import status from "http-status";
import ApiError from "../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createArticle = async (user: IAuthUser, payload: any) => {
  const { title, body, tags } = payload;

  // check if user exist

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  // Validate fields
  if (!title || !body || !Array.isArray(tags)) {
    throw new ApiError(
      status.BAD_REQUEST,
      "Title, body, and tags are required"
    );
  }

  // article  save to DB
  const newArticle = await prisma.article.create({
    data: {
      title,
      body,
      tags,
      userId: userData.id,
    },
  });

  return newArticle;
};

export const ArticleService = {
  createArticle,
};
