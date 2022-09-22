import { E2ERepository } from "../../repositories/prisma/E2ERepository";
import { ResetDatabaseService } from "../../services/E2EServices/ResetDatabaseService";
import { ResetDatabaseController } from "./ResetDatabaseController";

export function resetDatabaseController() {
  const repository = new E2ERepository();
  const service = new ResetDatabaseService(repository);
  const controller = new ResetDatabaseController(service);

  return controller;
}
