import { Router } from "express";
import {
  downvoteRecommendationController,
  upvoteRecommendationController,
  getRandomRecommendationController,
  createRecommendationController,
  getAllRecommendationController,
  getRecommendationByIdController,
  getTopRecommendationController,
} from "../controllers/RecommendationControllers/index";

const recommendationRouter = Router();

recommendationRouter.post("/", (req, res) =>
  createRecommendationController().handle(req, res)
);

recommendationRouter.get("/", (req, res) =>
  getAllRecommendationController().handle(req, res)
);

recommendationRouter.get("/random", (req, res) =>
  getRandomRecommendationController().handle(req, res)
);

recommendationRouter.get("/:id", (req, res) =>
  getRecommendationByIdController().handle(req, res)
);

recommendationRouter.post("/:id/upvote", (req, res) =>
  upvoteRecommendationController().handle(req, res)
);

recommendationRouter.post("/:id/downvote", (req, res) =>
  downvoteRecommendationController().handle(req, res)
);

recommendationRouter.get("/top/:amount", (req, res) =>
  getTopRecommendationController().handle(req, res)
);

export default recommendationRouter;
