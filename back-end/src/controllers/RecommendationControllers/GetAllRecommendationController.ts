import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IGetAllRecommendationsService } from "../../services/RecommendationServices/GetAllRecommendationsService";

export class GetAllRecommendationController extends Controller<IGetAllRecommendationsService> {
  async handle(req: Request, res: Response): Promise<void> {
    const recommendations = await this.service.execute();

    res.status(200).send(recommendations);
  }
}
