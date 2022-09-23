import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";
import { notFoundError } from "../../utils/errorUtils";
import {
  IGetRandomRecommendationService,
  GetRandomRecommendationService,
} from "./GetRandomRecommendationService";

describe("Get Random Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let getRandomRecommendationService: IGetRandomRecommendationService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    getRandomRecommendationService = new GetRandomRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to get a random recommendation ", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementationOnce(async () =>
        new RecommendationFactory().generateValidRecommendationArray()
      );

    await expect(
      getRandomRecommendationService.execute()
    ).resolves.not.toThrow();

    expect(recommendationRepository.findAll).toHaveBeenCalled();
  });

  it("Should not be able to get a random recommendation if there are no recommendations", async () => {
    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue([]);

    await expect(getRandomRecommendationService.execute()).rejects.toEqual(
      notFoundError("Recommendation not found")
    );

    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(2);
  });
});
