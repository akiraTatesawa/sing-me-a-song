import { randFullName, randNumber, randVerb } from "@ngneat/falso";
import { Recommendation } from "@prisma/client";
import { CreateRecommendationData } from "../../src/@types/RecommendationTypes";
import { prisma } from "../../src/database";

interface IRecommendationGeneratorFactory {
  generateValidRecommendationRequest(): CreateRecommendationData;
  generateInvalidRecommendationRequest(): CreateRecommendationData & {
    invalidField: string;
  };
  generateValidRecommendationDB(): Recommendation;
  generateValidRecommendationArray(): Recommendation[];
}

interface IRecommendationPrismaFactory {
  createRecommendation(): Promise<Recommendation>;
  createMultipleRecommendations(): Promise<number>;
  changeRecommendationScore(id: number, score: number): Promise<void>;
}

interface IRecommendationFactory
  extends IRecommendationGeneratorFactory,
    IRecommendationPrismaFactory {}

export class RecommendationFactory implements IRecommendationFactory {
  generateValidRecommendationRequest() {
    const recommendation: CreateRecommendationData = {
      name: randFullName(),
      youtubeLink: `https://www.youtube.com/${randVerb()}`,
    };

    return recommendation;
  }

  generateInvalidRecommendationRequest(): CreateRecommendationData & {
    invalidField: string;
  } {
    const recommendation = {
      ...this.generateValidRecommendationRequest(),
      invalidField: "invalid",
    };

    return recommendation;
  }

  generateValidRecommendationDB(isScoreRandom: boolean = false) {
    const recommendation: Recommendation = {
      id: randNumber({ min: 1, max: 1000 }),
      name: randFullName(),
      youtubeLink: `https://www.youtube.com/${randVerb()}`,
      score: isScoreRandom ? randNumber({ min: -4, max: 20 }) : 0,
    };

    return recommendation;
  }

  generateValidRecommendationArray(
    length: number = 2,
    isScoreRandom: boolean = false
  ): Recommendation[] {
    const recommendationArray = [];

    for (let i = 0; i < length; i++) {
      recommendationArray.push(
        this.generateValidRecommendationDB(isScoreRandom)
      );
    }

    return recommendationArray;
  }

  async createRecommendation(): Promise<Recommendation> {
    const recommendationRequest = this.generateValidRecommendationRequest();

    return prisma.recommendation.create({
      data: recommendationRequest,
    });
  }

  async createMultipleRecommendations(): Promise<number> {
    const data = [
      this.generateValidRecommendationRequest(),
      this.generateValidRecommendationRequest(),
      this.generateValidRecommendationRequest(),
    ];

    const { count } = await prisma.recommendation.createMany({
      data,
    });

    return count;
  }

  async changeRecommendationScore(id: number, score: number): Promise<void> {
    await prisma.recommendation.update({
      where: {
        id,
      },
      data: {
        score,
      },
    });
  }
}
