import express from "express";
import * as NotesController from "../controllers/notes";

const router = express();

router.get("/", NotesController.getNotes);

router.get("/:noteId", NotesController.getNote);

router.post("/", NotesController.createNote);

export default router;
