import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IDownvoteRecommendationService {
  execute(id: number): Promise<void>;
}

export class DownvoteRecommendationService
  implements IDownvoteRecommendationService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    const recommendation = await this.repository.find(id);

    if (!recommendation) throw notFoundError("Recommendation not found");

    const updatedRecommendation = await this.repository.updateScore(
      id,
      "decrement"
    );

    if (updatedRecommendation.score < -5) {
      await this.repository.remove(id);
    }
  }
}
