import { IRecommendationRepository } from "../../repositories/IRecommendationRepository";
import {
  IGetRecommendationByIdService,
  GetRecommendationByIdService,
} from "./GetRecommendationByIdService";
import { MockRecommendationRepository } from "../../repositories/mocks/MockRecommendationRepository";
import { RecommendationFactory } from "../../../tests/factories/RecommendationFactory";
import { notFoundError } from "../../utils/errorUtils";

describe("Get Recommendation by Id Service", () => {
  let recommendationRepository: IRecommendationRepository;
  let getRecommendationByIdService: IGetRecommendationByIdService;

  beforeAll(() => {
    recommendationRepository = new MockRecommendationRepository();
    getRecommendationByIdService = new GetRecommendationByIdService(
      recommendationRepository
    );
  });

  it("Should be able to get a recommendation by id", async () => {
    const id = Math.floor(Math.random() * 100) + 1;
    const returnedRecommendation = {
      ...new RecommendationFactory().generateValidRecommendationDB(),
      id,
    };

    jest
      .spyOn(recommendationRepository, "find")
      .mockImplementationOnce(async () => returnedRecommendation);

    await expect(getRecommendationByIdService.execute(id)).resolves.toEqual(
      returnedRecommendation
    );

    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
  });

  it("Should not be able to get recommendation by id if does not exist", async () => {
    const id = Math.floor(Math.random() * 100) + 1;

    jest.spyOn(recommendationRepository, "find").mockResolvedValueOnce(null);

    await expect(getRecommendationByIdService.execute(id)).rejects.toEqual(
      notFoundError("Recommendation not found")
    );

    expect(recommendationRepository.find).toHaveBeenCalledWith(id);
  });
});
