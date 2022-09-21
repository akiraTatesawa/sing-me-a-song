// eslint-disable-next-line import/no-extraneous-dependencies
import request from "supertest";
import { prisma } from "../src/database";
import { app } from '../src/app';

describe("GET /recommendations", () => {
  beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations`;
  });
  afterAll(() => {
    prisma.$disconnect();
  });

  it("Should be able to get all recommendations", async () => {
    const result = await request(app).get("/recommendations");

    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Array);
  });
});
