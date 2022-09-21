import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IDownvoteRecommendationService } from "../../services/RecommendationServices/DownvoteRecommendationService";

export class DownvoteRecommendationController extends Controller<IDownvoteRecommendationService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.service.execute(+id);

    res.sendStatus(200);
  }
}
