import status from "http-status";
import ApiError from "../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createArticle = async (req: any) => {
  const { title, body, tags } = req.body;

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
      userId: req.user!.userId,
    },
  });
};

export const ArticleService = {
  createArticle,
};
