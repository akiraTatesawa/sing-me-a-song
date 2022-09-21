// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("POST /recommendations/:id/upvote", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to upvote a recommendation", async () => {
    const { id } = await new RecommendationFactory().createRecommendation();

    const result = await request(app).post(`/recommendations/${id}/upvote`);

    expect(result.status).toEqual(200);
    expect(result.body).toEqual({});
  });

  it("Should not be able to upvote a recommendation if does not exist", async () => {
    const result = await request(app).post(
      `/recommendations/${Math.floor(Math.random() * 100) + 1}/upvote`
    );

    expect(result.status).toEqual(404);
    expect(result.body).toEqual({});
  });
});
