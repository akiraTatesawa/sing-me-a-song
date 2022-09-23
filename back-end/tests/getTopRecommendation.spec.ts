// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Recommendation } from "@prisma/client";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("GET /recommendations/top/:amount", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to get the top recommendations", async () => {
    const amount =
      await new RecommendationFactory().createMultipleRecommendations();

    const result = await request(app).get(`/recommendations/top/${amount}`);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty<Recommendation>("id");
    expect(result.body).toHaveLength(amount);
  });
});
