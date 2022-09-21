import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IGetRandomRecommendationService } from "../../services/RecommendationServices/GetRandomRecommendation";

export class GetRandomRecommendationController extends Controller<IGetRandomRecommendationService> {
  async handle(req: Request, res: Response): Promise<void> {
    const randomRecommendation = await this.service.execute();

    res.status(200).send(randomRecommendation);
  }
}
