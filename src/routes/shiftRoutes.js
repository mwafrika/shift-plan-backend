import { Router } from "express";
import {
  createShiftController,
  updateShiftController,
  deleteShiftController,
  getAllShiftsController,
  getShiftByIdController
} from "../controllers/shift";
import { validateShiftData, validateID } from "../middleware/validateInput";
import isAuthenticated from "../middleware/authenticate.user";

const router = Router()
  .post("/", isAuthenticated, validateShiftData, createShiftController)
  .patch("/:id", isAuthenticated, validateID, updateShiftController)
  .delete("/:id", isAuthenticated, validateID, deleteShiftController)
  .get("/", isAuthenticated, getAllShiftsController)
  .get("/:id", isAuthenticated, validateID, getShiftByIdController);

export default router;
