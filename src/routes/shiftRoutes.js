import { Router } from "express";
import {
  createShiftController,
  updateShiftController,
  deleteShiftController,
  getAllShiftsController,
  getShiftByIdController,
  assignShiftToUsers
} from "../controllers/shift";
import { validateShiftData, validateID } from "../middleware/validateInput";
import isAuthenticated from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import ROLES from "../utils/constant";

const router = Router()
  .post(
    "/",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateShiftData,
    createShiftController
  )
  .patch(
    "/:id",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    updateShiftController
  )
  .delete(
    "/:id",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    deleteShiftController
  )
  .get(
    "/employees",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    getAllShiftsController
  )
  .get(
    "/:id",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    validateID,
    getShiftByIdController
  )
  .post(
    "/assign",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    assignShiftToUsers
  );

export default router;
