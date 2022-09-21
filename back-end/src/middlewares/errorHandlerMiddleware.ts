/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import {
  AppError,
  errorTypeToStatusCode,
  isAppError,
} from "../utils/errorUtils";

export function errorHandlerMiddleware(
  err: Error | AppError,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (isAppError(err)) {
    return res.status(errorTypeToStatusCode(err.type)).send(err.message);
  }

  return res.sendStatus(500);
}
