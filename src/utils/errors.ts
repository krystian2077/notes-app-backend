import { NextFunction, Request, Response } from "express";

export class ValidationError extends Error {}

export const handleError = (
  error: Error,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) => {
  console.error(error);

  res.status(error instanceof ValidationError ? 400 : 500).json({
    message:
      error instanceof ValidationError
        ? error.message
        : "Sorry, please try again later.",
  });
};
