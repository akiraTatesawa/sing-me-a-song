// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { Recommendation } from "@prisma/client";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("GET /recommendations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should return 200 and be able to get all recommendations", async () => {
    await new RecommendationFactory().createMultipleRecommendations();

    const result = await request(app).get("/recommendations");

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
    expect(result.body[0]).toHaveProperty<Recommendation>("id");
  });

  it("Should return 200 and be able to get an empty array if there are no recommendations", async () => {
    const result = await request(app).get("/recommendations");

    expect(result.status).toEqual(200);
    expect(result.body).toEqual([]);
  });
});
