import { RecommendationRepository } from "../../repositories/prisma/RecommendationRepository";
import { CreateRecommendationService } from "../../services/RecommendationServices/CreateRecommendationService";
import { CreateRecommendationController } from "./CreateRecommendationController";
import { DownvoteRecommendationService } from "../../services/RecommendationServices/DownvoteRecommendationService";
import { DownvoteRecommendationController } from "./DownvoteRecommendationController";
import { UpvoteRecommendationService } from "../../services/RecommendationServices/UpvoteRecommendationService";
import { UpvoteRecommendationController } from "./UpvoteRecommendationController";
import { GetAllRecommendationService } from "../../services/RecommendationServices/GetAllRecommendationsService";
import { GetAllRecommendationController } from "./GetAllRecommendationController";
import { GetRandomRecommendationService } from "../../services/RecommendationServices/GetRandomRecommendationService";
import { GetRandomRecommendationController } from "./GetRandomRecommendationController";
import { GetRecommendationByIdService } from "../../services/RecommendationServices/GetRecommendationByIdService";
import { GetRecommendationByIdController } from "./GetRecommendationByIdController";
import { GetTopRecommendationsService } from "../../services/RecommendationServices/GetTopRecommendationsService";
import { GetTopRecommendationController } from "./GetTopRecommendationController";

const getRecommendationRepository = () => new RecommendationRepository();

export function createRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new CreateRecommendationService(repository);
  return new CreateRecommendationController(service);
}

export function downvoteRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new DownvoteRecommendationService(repository);
  return new DownvoteRecommendationController(service);
}

export function upvoteRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new UpvoteRecommendationService(repository);
  return new UpvoteRecommendationController(service);
}

export function getAllRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new GetAllRecommendationService(repository);
  return new GetAllRecommendationController(service);
}

export function getRecommendationByIdController() {
  const repository = getRecommendationRepository();
  const service = new GetRecommendationByIdService(repository);
  return new GetRecommendationByIdController(service);
}

export function getRandomRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new GetRandomRecommendationService(repository);
  return new GetRandomRecommendationController(service);
}

export function getTopRecommendationController() {
  const repository = getRecommendationRepository();
  const service = new GetTopRecommendationsService(repository);
  return new GetTopRecommendationController(service);
}
