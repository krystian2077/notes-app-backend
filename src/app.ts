import "dotenv/config";
import express, { json } from "express";
import "express-async-errors";

import rateLimit from "express-rate-limit";
import morgan from "morgan";

import { handleError } from "./utils/errors";
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
app.use(handleError);
export default app;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//   console.log(error);
//
//   let errorMessage = "An unknown error occured";
//   if (error instanceof Error) errorMessage = error.message;
//   res.status(500).json({ errorMessage: errorMessage });
// });
