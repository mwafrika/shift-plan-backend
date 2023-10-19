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
import permit from "../middleware/permission";

const router = Router()
  .post(
    "/",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateShiftData,
    createShiftController
  )
  .patch(
    "/:id",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    updateShiftController
  )
  .delete(
    "/:id",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    deleteShiftController
  )
  .get(
    "/",
    isAuthenticated,
    permit("admin", "superAdmin", "manager", "employee"),
    getAllShiftsController
  )
  .get(
    "/:id",
    isAuthenticated,
    permit("admin", "superAdmin", "manager", "employee"),
    validateID,
    getShiftByIdController
  );

export default router;
