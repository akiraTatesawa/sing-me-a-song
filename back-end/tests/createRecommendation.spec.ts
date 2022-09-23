// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Recommendation } from "@prisma/client";
import { RecommendationFactory } from "./factories/RecommendationFactory";
import { prisma } from "../src/database";
import { app } from "../src/app";

describe("POST /recommendations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should return 201 and be able to create a recommendation", async () => {
    const recommendation =
      new RecommendationFactory().generateValidRecommendationRequest();

    const result = await request(app)
      .post("/recommendations")
      .send(recommendation);

    expect(result.status).toEqual(201);
    expect(result.body).toHaveProperty<Recommendation>("id");
  });

  it("Should return 422 and not be able to create a recommendation with invalid format", async () => {
    const invalidRecommendation =
      new RecommendationFactory().generateInvalidRecommendationRequest();

    const result = await request(app)
      .post("/recommendations")
      .send(invalidRecommendation);

    expect(result.status).toEqual(422);
    expect(result.body).toEqual({});
  });

  it("Should return 409 and not be able to create a recommendation with a non-unique name", async () => {
    const recommendation =
      await new RecommendationFactory().createRecommendation();

    const result = await request(app).post("/recommendations").send({
      name: recommendation.name,
      youtubeLink: recommendation.youtubeLink,
    });

    expect(result.status).toEqual(409);
    expect(result.body).toEqual({});
  });
});
