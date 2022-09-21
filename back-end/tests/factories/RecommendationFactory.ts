import { randFullName, randNumber, randVerb } from "@ngneat/falso";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/@types/RecommendationTypes";

interface IRecommendationFactory {
  generateValidRecommendationRequest(): CreateRecommendationData;
  generateValidRecommendationDB(): Recommendation;
  generateValidRecommendationArray(): Recommendation[];
}

export class RecommendationFactory implements IRecommendationFactory {
  generateValidRecommendationRequest() {
    const recommendation: CreateRecommendationData = {
      name: randFullName(),
      youtubeLink: `https://www.youtube.com/${randVerb()}`,
    };

    return recommendation;
  }

  generateValidRecommendationDB() {
    const recommendation: Recommendation = {
      id: randNumber({ min: 1, max: 1000 }),
      name: randFullName(),
      youtubeLink: `https://www.youtube.com/${randVerb()}`,
      score: randNumber({ min: -100, max: 100 }),
    };

    return recommendation;
  }

  generateValidRecommendationArray() {
    const recommendationArray = [
      this.generateValidRecommendationDB(),
      this.generateValidRecommendationDB(),
    ];

    return recommendationArray;
  }
}
