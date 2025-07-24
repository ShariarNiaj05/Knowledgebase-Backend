import express from "express";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
import { ArticleController } from "./article.controller";

const router = express.Router();

router.post(
  "/create-article",
  auth(UserRole.RegularUser),

  ArticleController.createArticles
);
router.get(
  "/article",
  auth(UserRole.RegularUser),

  ArticleController.getUserArticles
);

export const ArticleRoutes = router;
