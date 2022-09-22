import { IE2ERepository } from "../../repositories/IE2ERepository";

export interface IResetDatabaseService {
  execute(): Promise<void>;
}

export class ResetDatabaseService implements IResetDatabaseService {
  constructor(private repository: IE2ERepository) {
    this.repository = repository;
  }

  async execute(): Promise<void> {
    await this.repository.reset();
  }
}
