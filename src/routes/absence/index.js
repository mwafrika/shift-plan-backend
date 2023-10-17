import { Router } from "express";
import {
  createNewAbsence, findAllAbsence, updateAbsenceById, removeAbsence
} from "../../controllers/absence";
import { validateAbsenceData, validateID } from "../../middleware/validateInput";

const router = Router()
  .post("/create", validateAbsenceData, createNewAbsence)
  .get("/", findAllAbsence)
  .patch("/:id", validateID, updateAbsenceById)
  .delete("/:id", validateID, removeAbsence);

export default router;
