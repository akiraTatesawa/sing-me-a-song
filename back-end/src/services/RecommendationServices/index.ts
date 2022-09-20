import { RecommendationRepository } from "../../repositories/prisma/RecommendationRepository";
import { CreateRecommendationService } from "./CreateRecommendationService";
import { DownvoteRecommendationService } from "./DownvoteRecommendationService";
import { GetAllRecommendationService } from "./GetAllRecommendationsService";
import { GetRecommendationByIdService } from "./GetRecommendationByIdService";
import { UpvoteRecommendationService } from "./UpvoteRecommendationService";
import { GetTopRecommendationsService } from "./GetTopRecommendationsService";
import { GetRandomRecommendationService } from "./GetRandomRecommendation";

function getRepository() {
  return new RecommendationRepository();
}

export function createRecommendation() {
  const repository = getRepository();
  const createRecommendationService = new CreateRecommendationService(
    repository
  );

  return createRecommendationService;
}

export function upvoteRecommendation() {
  const repository = getRepository();
  const upvoteRecommendationService = new UpvoteRecommendationService(
    repository
  );

  return upvoteRecommendationService;
}

export function downvoteRecommendation() {
  const repository = getRepository();
  const downvoteRecommendationService = new DownvoteRecommendationService(
    repository
  );

  return downvoteRecommendationService;
}

export function getRecommendationById() {
  const repository = getRepository();
  const getRecommendationByIdService = new GetRecommendationByIdService(
    repository
  );

  return getRecommendationByIdService;
}

export function getAllRecommendations() {
  const repository = getRepository();
  const getAllRecommendationsService = new GetAllRecommendationService(
    repository
  );

  return getAllRecommendationsService;
}

export function getTopRecommendations() {
  const repository = getRepository();
  const getTopRecommendationsService = new GetTopRecommendationsService(
    repository
  );

  return getTopRecommendationsService;
}

export function getRandomRecommendation() {
  const repository = getRepository();
  const getRandomRecommendationService = new GetRandomRecommendationService(
    repository
  );

  return getRandomRecommendationService;
}
