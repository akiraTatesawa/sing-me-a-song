import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import {
  IGetAllRecommendationsService,
  GetAllRecommendationService,
} from "./GetAllRecommendationsService";

describe("Get All Recommendations Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let getAllRecommendationService: IGetAllRecommendationsService;

  beforeAll(() => {
    recommendationRepository = mockRecommendationRepository();
    getAllRecommendationService = new GetAllRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to get all recommendations", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce(async () => []);

    await expect(getAllRecommendationService.execute()).resolves.not.toThrow();
    expect(recommendationRepository.findAll).toHaveBeenCalled();
  });
});
