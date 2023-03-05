import "dotenv/config";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";

import rateLimit from "express-rate-limit";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";

import notesRoutes from "./routes/notes";

const app = express();

app.use(morgan("dev"));

app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use("/api/notes", notesRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, "Endpoint not found."));
});
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);

  let errorMessage = "An unknown error occured";
  let statusCode = 500;

  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});
export default app;

// @TODO adding updating and deleting notes
