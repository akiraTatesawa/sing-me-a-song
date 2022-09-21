import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";

export interface IGetTopRecommendationsService {
  execute(amount: number): Promise<Recommendation[]>;
}

export class GetTopRecommendationsService
  implements IGetTopRecommendationsService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(amount: number): Promise<Recommendation[]> {
    return this.repository.getAmountByScore(amount);
  }
}
