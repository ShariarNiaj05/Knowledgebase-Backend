import express from "express";
import { userRoutes } from "../modules/User/user.routes";
import { AuthRoutes } from "../modules/Auth/auth.route";
import { ArticleRoutes } from "../modules/Article/article.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    route: userRoutes,
  },

  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/article",
    route: ArticleRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
