import { Prisma, Recommendation } from "@prisma/client";
import { prisma } from "../../database";
import { CreateRecommendationData } from "../../@types/RecommendationTypes";
import {
  FindAllWhere,
  IRecommendationRepository,
} from "../IRecommendationRepository";

export class RecommendationRepository implements IRecommendationRepository {
  async create(
    createRecommendationData: CreateRecommendationData
  ): Promise<Recommendation> {
    return prisma.recommendation.create({
      data: createRecommendationData,
    });
  }

  private getFindAllFilter(
    findAllWhere?: FindAllWhere
  ): Prisma.RecommendationWhereInput {
    if (!findAllWhere) return {};

    const { score, scoreFilter } = findAllWhere;

    return {
      score: { [scoreFilter]: score },
    };
  }

  async findAll(
    findAllWhere?: FindAllWhere | undefined
  ): Promise<Recommendation[]> {
    const filter = this.getFindAllFilter(findAllWhere);

    return prisma.recommendation.findMany({
      where: filter,
      orderBy: { id: "desc" },
      take: 10,
    });
  }

  async find(id: number): Promise<Recommendation | null> {
    return prisma.recommendation.findUnique({
      where: { id },
    });
  }

  async getAmountByScore(take: number): Promise<Recommendation[]> {
    return prisma.recommendation.findMany({
      orderBy: { score: "desc" },
      take,
    });
  }

  async findByName(name: string): Promise<Recommendation | null> {
    return prisma.recommendation.findUnique({
      where: { name },
    });
  }

  async updateScore(
    id: number,
    operation: "increment" | "decrement"
  ): Promise<Recommendation> {
    return prisma.recommendation.update({
      where: { id },
      data: {
        score: { [operation]: 1 },
      },
    });
  }

  async remove(id: number): Promise<void> {
    await prisma.recommendation.delete({
      where: { id },
    });
  }
}
