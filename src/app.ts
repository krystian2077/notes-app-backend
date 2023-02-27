import "dotenv/config";
import express, { json } from "express";
import "express-async-errors";
import NoteModel from "./models/note";
import rateLimit from "express-rate-limit";
import { handleError } from "./utils/errors";

const app = express();

app.use(json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

app.get("/", async (req, res, next) => {
  try {
    const notes = await NoteModel.find().exec();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
// app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
//   console.log(error);
//
//   let errorMessage = "An unknown error occured";
//   if (error instanceof Error) errorMessage = error.message;
//   res.status(500).json({ errorMessage: errorMessage });
// });

app.use(handleError);
export default app;
