import { Request, Response } from "express";

import { Controller } from "../../@types/ControllerTypes";
import { recommendationSchema } from "../../schemas/recommendationsSchemas";
import { ICreateRecommendationService } from "../../services/RecommendationServices/CreateRecommendationService";
import { wrongSchemaError } from "../../utils/errorUtils";

export class CreateRecommendationController extends Controller<ICreateRecommendationService> {
  async handle(req: Request, res: Response): Promise<void> {
    const validation = recommendationSchema.validate(req.body);
    if (validation.error) {
      throw wrongSchemaError();
    }

    await this.service.execute(req.body);

    res.sendStatus(201);
  }
}
