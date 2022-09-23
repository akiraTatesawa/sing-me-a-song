import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IGetRandomRecommendationService {
  execute(): Promise<Recommendation>;
  setScoreFilter(): "gt" | "lte";
}

export class GetRandomRecommendationService
  implements IGetRandomRecommendationService
{
  private async getByScore(scoreFilter: "gt" | "lte") {
    const recommendations = await this.repository.findAll({
      score: 10,
      scoreFilter,
    });

    if (recommendations.length > 0) {
      return recommendations;
    }

    return this.repository.findAll();
  }

  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  setScoreFilter() {
    const random = Math.random();
    const scoreFilter = random < 0.7 ? "gt" : "lte";

    return scoreFilter;
  }

  async execute(): Promise<Recommendation> {
    const scoreFilter = this.setScoreFilter();

    const recommendations = await this.getByScore(scoreFilter);

    if (recommendations.length === 0) {
      throw notFoundError("Recommendation not found");
    }

    const randomIndex = Math.floor(Math.random() * recommendations.length);
    return recommendations[randomIndex];
  }
}
