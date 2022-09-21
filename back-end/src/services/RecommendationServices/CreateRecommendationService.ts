import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../@types/RecommendationTypes";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { conflictError } from "../../utils/errorUtils";

export interface ICreateRecommendationService {
  execute(
    createRecommendationData: CreateRecommendationData
  ): Promise<Recommendation>;
}

export class CreateRecommendationService
  implements ICreateRecommendationService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(
    createRecommendationData: CreateRecommendationData
  ): Promise<Recommendation> {
    const existingRecommendation = await this.repository.findByName(
      createRecommendationData.name
    );

    if (existingRecommendation) {
      throw conflictError("Recommendations names must be unique");
    }

    return this.repository.create(createRecommendationData);
  }
}
