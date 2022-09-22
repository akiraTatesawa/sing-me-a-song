import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IResetDatabaseService } from "../../services/E2EServices/ResetDatabaseService";

export class ResetDatabaseController extends Controller<IResetDatabaseService> {
  async handle(req: Request, res: Response): Promise<void> {
    await this.service.execute();

    res.sendStatus(200);
  }
}
