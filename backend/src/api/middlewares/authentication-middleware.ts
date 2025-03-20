import { ExpressRequestWithAuth } from "@clerk/express";
import { NextFunction, Response } from "express";
import UnAuthorizedError from "../../domain/errors/unauthorized-error";

export const isAuthenticated = (
  req: ExpressRequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  if (!req?.auth.userId) {
    throw new UnAuthorizedError("unauthorized");
  }
  next();
};
