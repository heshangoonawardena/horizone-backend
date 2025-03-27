import { NextFunction, Request, Response } from "express";

const globalErrorHandlingMiddleware = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error.name === "NotFoundError") {
    res.status(404).json({ message: error.message });
    return;
  }
  if (error.name === "UnAuthorizedError") {
    res.status(401).json({ message: error.message });
    return;
  }
  if (error.name === "ForbiddenError") {
    res.status(403).json({ message: error.message });
    return;
  }
  if (error.name === "ValidationError") {
    res.status(400).json({ message: error.message });
    return;
  }
  res.status(500).json({ message: "Internal server error" });
  return;
};

export default globalErrorHandlingMiddleware;
