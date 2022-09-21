// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("POST /recommendation/:id/downvote", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to downvote a recommendation", async () => {
    const { id } = await new RecommendationFactory().createRecommendation();

    const result = await request(app).post(`/recommendations/${id}/downvote`);

    expect(result.status).toEqual(200);
    expect(result.body).toEqual({});
  });

  it("Should not be able to downvote a recommendation if does not exist", async () => {
    const result = await request(app).post(
      `/recommendations/${Math.floor(Math.random() * 100) + 1}/downvote`
    );

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({});
  });
});
