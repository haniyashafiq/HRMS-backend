import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

export const errorHandler = (
  err: ApiError | unknown,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err);

  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }

  return res.status(500).json({ message: "Internal Server Error" });
};
