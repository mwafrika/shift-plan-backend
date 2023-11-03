import { Router } from "express";
import {
  createAbsenceController,
  updateAbsenceController,
  deleteAbsenceController,
  getAllAbsencesController,
  getAbsenceByUserIdController,
  approveDenyAbsenceController
} from "../controllers/abscence";
import auth from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import ROLES from "../utils/constant";

const router = Router()
  .post(
    "/",
    auth,
    permit(ROLES.EMPLOYEE, ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    createAbsenceController
  )
  .delete(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    deleteAbsenceController
  )
  .get(
    "/",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    getAllAbsencesController
  )
  .get(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    getAbsenceByUserIdController
  )
  .patch(
    "/:id/approve",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    approveDenyAbsenceController
  );

export default router;
