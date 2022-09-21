import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IUpvoteRecommendationService {
  execute(id: number): Promise<void>;
}

export class UpvoteRecommendationService
  implements IUpvoteRecommendationService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    const recommendation = await this.repository.find(id);

    if (!recommendation) throw notFoundError("Recommendation not found");

    await this.repository.updateScore(id, "increment");
  }
}
