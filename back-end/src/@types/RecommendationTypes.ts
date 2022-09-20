import { Recommendation } from "@prisma/client";

export type CreateRecommendationData = Omit<Recommendation, "id" | "score">;
