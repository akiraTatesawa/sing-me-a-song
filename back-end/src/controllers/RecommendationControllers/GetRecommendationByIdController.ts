import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { IGetRecommendationByIdService } from "../../services/RecommendationServices/GetRecommendationByIdService";

export class GetRecommendationByIdController extends Controller<IGetRecommendationByIdService> {
  async handle(req: Request, res: Response): Promise<void> {
    const { id } = req.params;

    const recommendation = await this.service.execute(+id);
    res.status(200).send(recommendation);
  }
}
