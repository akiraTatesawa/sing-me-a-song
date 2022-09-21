import { Recommendation } from "@prisma/client";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import {
  DownvoteRecommendationService,
  IDownvoteRecommendationService,
} from "./DownvoteRecommendationService";

describe("Downvote Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let downvoteRecommendationService: IDownvoteRecommendationService;

  beforeAll(() => {
    recommendationRepository = mockRecommendationRepository();
    downvoteRecommendationService = new DownvoteRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to Downvote a recommendation without removing it", async () => {
    const id = 1;

    const existingRecommendation: Recommendation = {
      id: 1,
      name: "Recommendation from DB",
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
      score: 10,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(existingRecommendation);
    jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
      ...existingRecommendation,
      score: existingRecommendation.score - 1,
    });

    await expect(
      downvoteRecommendationService.execute(id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalled();
    expect(recommendationRepository.updateScore).toHaveBeenCalled();
    expect(recommendationRepository.remove).not.toHaveBeenCalled();
  });

  it("Should be able to Downvote a recommendation and remove it", async () => {
    const id = 1;

    const existingRecommendation: Recommendation = {
      id: 1,
      name: "Recommendation from DB",
      youtubeLink: "https://www.youtube.com/watch?v=hyV1AJiFNyo",
      score: -5,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(existingRecommendation);
    jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
      ...existingRecommendation,
      score: existingRecommendation.score - 1,
    });

    await expect(
      downvoteRecommendationService.execute(id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalled();
    expect(recommendationRepository.updateScore).toHaveBeenCalled();
    expect(recommendationRepository.remove).toHaveBeenCalled();
  });

  it("Should not be able to Downvote a recommendation if does not exist", async () => {
    const id = 1;

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    await expect(downvoteRecommendationService.execute(id)).rejects.toEqual({
      message: "Recommendation not found",
      type: "not_found",
    });

    expect(recommendationRepository.find).toHaveBeenCalled();
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
    expect(recommendationRepository.remove).not.toHaveBeenCalled();
  });
});
