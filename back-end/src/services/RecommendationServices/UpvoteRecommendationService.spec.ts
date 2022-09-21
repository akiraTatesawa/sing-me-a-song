import { Recommendation } from "@prisma/client";
import {
  IUpvoteRecommendationService,
  UpvoteRecommendationService,
} from "./UpvoteRecommendationService";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";

describe("Upvote Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let upvoteRecommendationService: IUpvoteRecommendationService;

  beforeAll(() => {
    recommendationRepository = mockRecommendationRepository();
    upvoteRecommendationService = new UpvoteRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to Upvote a recommendation", async () => {
    const id = 1;

    const existingRecommendation: Recommendation = {
      id,
      name: "Recommendation from DB",
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
      score: 10,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(existingRecommendation);

    await expect(
      upvoteRecommendationService.execute(id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalled();
    expect(recommendationRepository.updateScore).toHaveBeenCalled();
  });

  it("Should not be able to Upvote a recommendation if does not exist", async () => {
    const id = 1;

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    await expect(upvoteRecommendationService.execute(id)).rejects.toEqual({
      message: "Recommendation not found",
      type: "not_found",
    });

    expect(recommendationRepository.find).toHaveBeenCalled();
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
  });
});
