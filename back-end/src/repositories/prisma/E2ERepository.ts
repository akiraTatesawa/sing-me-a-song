import { prisma } from "../../database";
import { IE2ERepository } from "../IE2ERepository";

export class E2ERepository implements IE2ERepository {
  async reset(): Promise<void> {
    await prisma.$queryRaw`TRUNCATE TABLE recommendations RESTART IDENTITY CASCADE;`;
  }
}
