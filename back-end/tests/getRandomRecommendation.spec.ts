// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../src/database";
import { app } from "../src/app";
import { RecommendationFactory } from "./factories/RecommendationFactory";

describe("GET /recommendations/random", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to get a random recommendation", async () => {
    await new RecommendationFactory().createMultipleRecommendations();

    const result = await request(app)
      .get("/recommendations/random")
      .expect(200);

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
    expect(result.body).toHaveProperty("id");
  });

  it("Should return 404 and not be able to get a random recommendation if does not exist", async () => {
    const result = await request(app)
      .get("/recommendations/random")
      .expect(404);

    expect(result.body).toEqual({});
  });
});
