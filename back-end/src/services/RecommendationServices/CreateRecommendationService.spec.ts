import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../@types/RecommendationTypes";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { conflictError } from "../../utils/errorUtils";
import {
  ICreateRecommendationService,
  CreateRecommendationService,
} from "./CreateRecommendationService";

describe("Create Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let createRecommendationService: ICreateRecommendationService;

  beforeAll(() => {
    recommendationRepository = mockRecommendationRepository();
    createRecommendationService = new CreateRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to create a recommendation", async () => {
    const recommendation: CreateRecommendationData = {
      name: "Create Recommendation Service Test",
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
    };

    await expect(
      createRecommendationService.execute(recommendation)
    ).resolves.not.toThrow();

    expect(recommendationRepository.findByName).toHaveBeenCalled();
    expect(recommendationRepository.create).toHaveBeenCalled();
  });

  it("Should not be able to create a recommendation with a non-unique name", async () => {
    const recommendation: CreateRecommendationData = {
      name: "Create Recommendation Service Test",
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
    };

    const existingRecommendation: Recommendation = {
      id: 1,
      name: recommendation.name,
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
      score: 0,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(existingRecommendation);

    await expect(
      createRecommendationService.execute(recommendation)
    ).rejects.toEqual(conflictError("Recommendations names must be unique"));

    expect(recommendationRepository.findByName).toHaveBeenCalled();
  });
});
