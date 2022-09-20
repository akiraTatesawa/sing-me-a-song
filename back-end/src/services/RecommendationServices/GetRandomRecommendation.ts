import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IGetRandomRecommendationService {
  execute(): Promise<Recommendation>;
}

export class GetRandomRecommendationService
  implements IGetRandomRecommendationService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Recommendation> {
    const random = Math.random();
    const scoreFilter = random < 0.7 ? "gt" : "lte";

    let recommendations = await this.repository.findAll({
      score: 10,
      scoreFilter,
    });

    if (recommendations.length < 0) {
      recommendations = await this.repository.findAll();
    }

    if (recommendations.length === 0) {
      throw notFoundError();
    }

    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
  }
}
