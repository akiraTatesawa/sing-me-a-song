import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";

export interface IGetRecommendationByIdService {
  execute(id: number): Promise<void>;
}

export class GetRecommendationByIdService
  implements IGetRecommendationByIdService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(id: number): Promise<void> {
    const recommendation = await this.repository.find(id);
    if (!recommendation) throw notFoundError();
  }
}
