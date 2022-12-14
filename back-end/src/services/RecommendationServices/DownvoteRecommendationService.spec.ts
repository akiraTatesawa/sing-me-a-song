import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";
import {
  DownvoteRecommendationService,
  IDownvoteRecommendationService,
} from "./DownvoteRecommendationService";

describe("Downvote Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let downvoteRecommendationService: IDownvoteRecommendationService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    downvoteRecommendationService = new DownvoteRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to Downvote a recommendation without removing it", async () => {
    const existingRecommendation =
      new RecommendationFactory().generateValidRecommendationDB();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(existingRecommendation);
    jest.spyOn(recommendationRepository, "updateScore").mockResolvedValueOnce({
      ...existingRecommendation,
      score: existingRecommendation.score - 1,
    });

    await expect(
      downvoteRecommendationService.execute(existingRecommendation.id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalledWith(
      existingRecommendation.id
    );
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(
      existingRecommendation.id,
      "decrement"
    );
    expect(recommendationRepository.remove).not.toHaveBeenCalled();
  });

  it("Should be able to Downvote a recommendation and remove it", async () => {
    const existingRecommendation = {
      ...new RecommendationFactory().generateValidRecommendationDB(),
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
      downvoteRecommendationService.execute(existingRecommendation.id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalledWith(
      existingRecommendation.id
    );
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(
      existingRecommendation.id,
      "decrement"
    );
    expect(recommendationRepository.remove).toHaveBeenCalledWith(
      existingRecommendation.id
    );
  });

  it("Should not be able to Downvote a recommendation if does not exist", async () => {
    const id = 1;

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    await expect(downvoteRecommendationService.execute(id)).rejects.toEqual(
      notFoundError("Recommendation not found")
    );

    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
    expect(recommendationRepository.remove).not.toHaveBeenCalled();
  });
});
