import { IRecommendationRepository } from "../IRecommendationRepository";

export class MockRecommendationRepository implements IRecommendationRepository {
  create = jest.fn();

  findAll = jest.fn();

  getAmountByScore = jest.fn();

  find = jest.fn();

  findByName = jest.fn();

  updateScore = jest.fn();

  remove = jest.fn();
}
