import { NextFunction, Response } from "express";
import ForbiddenError from "../../domain/errors/forbidden-error";
import { ExpressRequestWithAuth } from "@clerk/express";

export const isAdmin = (
  req: ExpressRequestWithAuth,
  res: Response,
  next: NextFunction
) => {
  if (req?.auth?.sessionClaims?.metadata?.role !== "admin") {
    throw new ForbiddenError("Forbidden");
  }

  next();
};
