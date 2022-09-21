import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import {
  IGetTopRecommendationsService,
  GetTopRecommendationsService,
} from "./GetTopRecommendationsService";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";

describe("Get Top Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let getTopRecommendationService: IGetTopRecommendationsService;

  beforeAll(() => {
    recommendationRepository = mockRecommendationRepository();
    getTopRecommendationService = new GetTopRecommendationsService(
      recommendationRepository
    );
  });

  it("Should be able to get the top recommendations", async () => {
    const amount = Math.floor(Math.random() * 10) + 1;

    jest
      .spyOn(recommendationRepository, "getAmountByScore")
      .mockResolvedValueOnce([
        ...new RecommendationFactory().generateValidRecommendationArray(amount),
      ]);

    await expect(
      getTopRecommendationService.execute(amount)
    ).resolves.not.toThrow();

    expect(recommendationRepository.getAmountByScore).toHaveBeenCalledWith(
      amount
    );
  });
});
