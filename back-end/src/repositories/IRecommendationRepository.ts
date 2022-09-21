import { Recommendation, Prisma } from "@prisma/client";
import { CreateRecommendationData } from "../services/recommendationsService";

export interface FindAllWhere {
  score: number;
  scoreFilter: "lte" | "gt";
}

export interface IRecommendationRepository {
  create(createRecommendationData: CreateRecommendationData): Promise<void>;
  getFindAllFilter(
    findAllWhere?: FindAllWhere
  ): Prisma.RecommendationWhereInput;
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
