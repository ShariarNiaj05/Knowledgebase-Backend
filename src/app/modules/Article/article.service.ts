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
const getUserArticles = async (user: IAuthUser) => {
  // check if user exist

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  const articles = await prisma.article.findMany({
    where: {
      userId: userData.id,
    },
    orderBy: { createdAt: "desc" },
  });

  return articles;
};
const deleteArticle = async (user: IAuthUser, articleId: string) => {
  // check if user exist

  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });

  //  Find the article
  const article = await prisma.article.findUnique({
    where: { id: articleId },
  });

  // Check if it exists and belongs to the user
  if (!article || article.userId !== userData.id) {
    throw new ApiError(
      status.BAD_REQUEST,
      "You are not allowed to delete this article"
    );
  }

  const deleteArticle = await prisma.article.delete({
    where: { id: articleId },
  });

  return deleteArticle;
};

export const ArticleService = {
  createArticle,
  getUserArticles,
  deleteArticle,
};
