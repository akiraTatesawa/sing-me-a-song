import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { conflictError } from "../../utils/errorUtils";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";
import {
  ICreateRecommendationService,
  CreateRecommendationService,
} from "./CreateRecommendationService";

describe("Create Recommendation Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let createRecommendationService: ICreateRecommendationService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    createRecommendationService = new CreateRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to create a recommendation", async () => {
    const recommendation =
      new RecommendationFactory().generateValidRecommendationRequest();

    const createdRecommendation = {
      ...new RecommendationFactory().generateValidRecommendationDB(),
      name: recommendation.name,
      youtubeLink: recommendation.youtubeLink,
    };

    jest
      .spyOn(recommendationRepository, "create")
      .mockResolvedValueOnce(createdRecommendation);

    await expect(
      createRecommendationService.execute(recommendation)
    ).resolves.toEqual(createdRecommendation);

    expect(recommendationRepository.findByName).toHaveBeenCalledWith(
      recommendation.name
    );
    expect(recommendationRepository.create).toHaveBeenCalledWith(
      recommendation
    );
  });

  it("Should not be able to create a recommendation with a non-unique name", async () => {
    const recommendation =
      new RecommendationFactory().generateValidRecommendationRequest();

    const existingRecommendation = {
      ...new RecommendationFactory().generateValidRecommendationDB(),
      name: recommendation.name,
    };

    jest
      .spyOn(recommendationRepository, "findByName")
      .mockResolvedValueOnce(existingRecommendation);

    await expect(
      createRecommendationService.execute(recommendation)
    ).rejects.toEqual(conflictError("Recommendations names must be unique"));

    expect(recommendationRepository.findByName).toHaveBeenCalledWith(
      recommendation.name
    );
    expect(recommendationRepository.create).not.toHaveBeenCalled();
  });
});
