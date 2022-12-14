import {
  IUpvoteRecommendationService,
  UpvoteRecommendationService,
} from "./UpvoteRecommendationService";
import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { notFoundError } from "../../utils/errorUtils";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";

describe("Upvote Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let upvoteRecommendationService: IUpvoteRecommendationService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    upvoteRecommendationService = new UpvoteRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to Upvote a recommendation", async () => {
    const existingRecommendation =
      new RecommendationFactory().generateValidRecommendationDB();

    jest
      .spyOn(recommendationRepository, "find")
      .mockResolvedValueOnce(existingRecommendation);

    await expect(
      upvoteRecommendationService.execute(existingRecommendation.id)
    ).resolves.not.toThrow();

    expect(recommendationRepository.find).toHaveBeenCalledWith(
      existingRecommendation.id
    );
    expect(recommendationRepository.updateScore).toHaveBeenCalledWith(
      existingRecommendation.id,
      "increment"
    );
  });

  it("Should not be able to Upvote a recommendation if does not exist", async () => {
    const id = 1;

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    await expect(upvoteRecommendationService.execute(id)).rejects.toEqual(
      notFoundError("Recommendation not found")
    );

    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
    expect(recommendationRepository.updateScore).not.toHaveBeenCalled();
  });
});
