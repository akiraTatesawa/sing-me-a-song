// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("GET /recommendations/:id", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to get a recommendation by id", async () => {
    const recommendation =
      await new RecommendationFactory().createRecommendation();

    const result = await request(app).get(
      `/recommendations/${recommendation.id}`
    );

    expect(result.status).toEqual(200);
    expect(result.body).toEqual(recommendation);
  });

  it("Should not be able to get a recommendation if does not exist ", async () => {
    const result = await request(app).get(
      `/recommendations/${Math.floor(Math.random() * 100) + 1}`
    );

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({});
  });
});
