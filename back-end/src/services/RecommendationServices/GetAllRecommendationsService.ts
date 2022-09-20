import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";

export interface IGetAllRecommendationsService {
  execute(): Promise<Recommendation[]>;
}

export class GetAllRecommendationService
  implements IGetAllRecommendationsService
{
  constructor(private repository: IRecommendationRepository) {
    this.repository = repository;
  }

  async execute(): Promise<Recommendation[]> {
    return this.repository.findAll();
  }
}
