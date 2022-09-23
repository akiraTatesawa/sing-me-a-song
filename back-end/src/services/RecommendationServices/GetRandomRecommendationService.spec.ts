import { Recommendation } from "@prisma/client";
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

  it("Should only return a random recommendation with a score greater than 10", async () => {
    const mockRecommendations: Recommendation[] = [
      {
        ...new RecommendationFactory().generateValidRecommendationDB(),
        score: 15,
      },
    ];

    jest.spyOn(global.Math, "random").mockReturnValue(0.6);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(mockRecommendations);

    const recommendationPromise = getRandomRecommendationService.execute();

    await expect(recommendationPromise).resolves.not.toThrow();
    expect((await recommendationPromise).score).toBeGreaterThan(10);

    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(1);
    expect(recommendationRepository.findAll).toHaveBeenCalledWith({
      score: 10,
      scoreFilter: "gt",
    });
  });

  it("Should only return a random recommendation with a score less then or equal to 10", async () => {
    const mockRecommendations: Recommendation[] = [
      {
        ...new RecommendationFactory().generateValidRecommendationDB(),
        score: 0,
      },
    ];

    jest.spyOn(global.Math, "random").mockReturnValue(0.8);
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockResolvedValue(mockRecommendations);

    const recommendationPromise = getRandomRecommendationService.execute();

    await expect(recommendationPromise).resolves.not.toThrow();
    expect((await recommendationPromise).score).toBeLessThanOrEqual(10);

    expect(recommendationRepository.findAll).toHaveBeenCalledTimes(1);
    expect(recommendationRepository.findAll).toHaveBeenCalledWith({
      score: 10,
      scoreFilter: "lte",
    });
  });

  it("Should be able to get a random recommendation ", async () => {
    jest
      .spyOn(recommendationRepository, "findAll")
      .mockImplementation(async () =>
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
