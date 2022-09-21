import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import { mockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
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
    recommendationRepository = mockRecommendationRepository();
    createRecommendationService = new CreateRecommendationService(
      recommendationRepository
    );
  });

  it("Should be able to create a recommendation", async () => {
    const recommendation =
      new RecommendationFactory().generateValidRecommendationRequest();

    await expect(
      createRecommendationService.execute(recommendation)
    ).resolves.not.toThrow();

    expect(recommendationRepository.findByName).toHaveBeenCalled();
    expect(recommendationRepository.create).toHaveBeenCalled();
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

    expect(recommendationRepository.findByName).toHaveBeenCalled();
  });
});
