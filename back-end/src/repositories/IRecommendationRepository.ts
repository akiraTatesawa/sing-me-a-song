import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../@types/RecommendationTypes";

export interface FindAllWhere {
  score: number;
  scoreFilter: "lte" | "gt";
}

export interface IRecommendationRepository {
  create(
    createRecommendationData: CreateRecommendationData
  ): Promise<Recommendation>;
  findAll(findAllWhere?: FindAllWhere): Promise<Recommendation[]>;
  getAmountByScore(take: number): Promise<Recommendation[]>;
  find(id: number): Promise<Recommendation | null>;
  findByName(name: string): Promise<Recommendation | null>;
  updateScore(
    id: number,
    operation: "increment" | "decrement"
  ): Promise<Recommendation>;
  remove(id: number): Promise<void>;
}
