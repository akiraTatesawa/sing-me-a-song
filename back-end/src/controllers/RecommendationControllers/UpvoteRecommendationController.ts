import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IUpvoteRecommendationService } from "../../services/RecommendationServices/UpvoteRecommendationService";

export class UpvoteRecommendationController extends Controller<IUpvoteRecommendationService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    await this.service.execute(+id);

    res.sendStatus(200);
  }
}
