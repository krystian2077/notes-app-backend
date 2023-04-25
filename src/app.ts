import "dotenv/config";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";

import rateLimit from "express-rate-limit";
import morgan from "morgan";
import createHttpError, { isHttpError } from "http-errors";
import MongoStore from "connect-mongo";
import env from "./utils/validateEnv";

import notesRoutes from "./routes/notes";
import userRoutes from "./routes/users";
import session from "express-session";
import { requiresAuth } from "../middleware/auth";
import cors from "cors";

const app = express();


app.use(morgan("dev"));

app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.use(
  session({
    secret: env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 60 * 60 * 1000,
    },
    rolling: true,
    store: MongoStore.create({
      mongoUrl: env.MONGO_CONNECTION_LINK,
    }),
  })
);

app.use("/api/users", userRoutes);
app.use("/api/notes", requiresAuth, notesRoutes);

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
