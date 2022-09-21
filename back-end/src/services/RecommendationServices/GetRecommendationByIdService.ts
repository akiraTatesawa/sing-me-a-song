import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IGetRecommendationByIdService {
  execute(id: number): Promise<Recommendation>;
}

export class GetRecommendationByIdService
  implements IGetRecommendationByIdService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<Recommendation> {
    const recommendation = await this.repository.find(id);

    if (!recommendation) {
      throw notFoundError("Recommendation not found");
    }

    return recommendation;
  }
}
