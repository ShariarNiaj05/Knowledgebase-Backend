import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandlers";
import apiNotFound from "./app/middlewares/apiNotFound";
import cookieParser from "cookie-parser";
import cron from "node-cron";

const app: Application = express();
app.use(cors());
app.use(cookieParser());

// parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({
    Message: "server",
  });
});

app.use("/api/v1", router);
app.use(globalErrorHandler);
app.use(apiNotFound);

export default app;
