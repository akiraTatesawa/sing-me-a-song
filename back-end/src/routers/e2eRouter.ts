import { Router } from "express";
import { resetDatabaseController } from "../controllers/E2EControllers";

export const e2eRouter = Router();

e2eRouter.delete("/reset-database", (req, res) =>
  resetDatabaseController().handle(req, res)
);
