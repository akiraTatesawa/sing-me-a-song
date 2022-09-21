import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import "express-async-errors";
import { errorHandlerMiddleware } from "./middlewares/errorHandlerMiddleware";
import recommendationRouter from "./routers/recommendationRouter";

dotenv.config();

export const app = express();
app.use(cors());
app.use(express.json());

app.use("/recommendations", recommendationRouter);
app.use(errorHandlerMiddleware);
