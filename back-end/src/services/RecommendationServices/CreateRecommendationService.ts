import { CreateRecommendationData } from "../../@types/RecommendationTypes";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { conflictError } from "../../utils/errorUtils";

export interface ICreateRecommendationService {
  execute(createRecommendationData: CreateRecommendationData): Promise<void>;
}

export class CreateRecommendationService
  implements ICreateRecommendationService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(
    createRecommendationData: CreateRecommendationData
  ): Promise<void> {
    const existingRecommendation = await this.repository.findByName(
      createRecommendationData.name
    );

    if (existingRecommendation) {
      throw conflictError("Recommendations names must be unique");
    }

    await this.repository.create(createRecommendationData);
  }
}
