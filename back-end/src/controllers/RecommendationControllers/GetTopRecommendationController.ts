import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IGetTopRecommendationsService } from "../../services/RecommendationServices/GetTopRecommendationsService";

export class GetTopRecommendationController extends Controller<IGetTopRecommendationsService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { amount } = req.params;

    const recommendations = await this.service.execute(+amount);
    res.status(200).send(recommendations);
  }
}
