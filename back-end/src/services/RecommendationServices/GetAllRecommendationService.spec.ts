import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";
import {
  IGetAllRecommendationsService,
  GetAllRecommendationService,
} from "./GetAllRecommendationsService";

describe("Get All Recommendations Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let getAllRecommendationService: IGetAllRecommendationsService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    getAllRecommendationService = new GetAllRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to get all recommendations", async () => {
    const expectedResult =
      new RecommendationFactory().generateValidRecommendationArray();

    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce(
        async (): Promise<Recommendation[]> => expectedResult
      );

    await expect(getAllRecommendationService.execute()).resolves.toEqual<
      Recommendation[]
    >(expectedResult);
    expect(recommendationRepository.findAll).toHaveBeenCalled();
  });
});
