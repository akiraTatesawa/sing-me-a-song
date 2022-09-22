import { IE2ERepository } from "../../repositories/IE2ERepository";
import { MockE2ERepository } from "../../repositories/mocks/MockE2ERepository";
import {
  IResetDatabaseService,
  ResetDatabaseService,
} from "./ResetDatabaseService";

describe("Reset Database Service", () => {
  let repository: IE2ERepository;
  let resetDatabaseService: IResetDatabaseService;

  beforeAll(() => {
    repository = MockE2ERepository();
    resetDatabaseService = new ResetDatabaseService(repository);
  });
  it("Should be able to reset the database", async () => {
    jest.spyOn(repository, "reset").mockImplementationOnce(async () => {});

    await expect(resetDatabaseService.execute()).resolves.not.toThrow();
    expect(repository.reset).toHaveBeenCalled();
  });
});
