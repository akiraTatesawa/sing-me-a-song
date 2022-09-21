import joi from "joi";
import { CreateRecommendationData } from "../@types/RecommendationTypes";

const youtubeLinkRegex = /^(https?:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;

export const recommendationSchema = joi.object<CreateRecommendationData>({
  name: joi.string().required(),
  youtubeLink: joi.string().required().pattern(youtubeLinkRegex),
});
