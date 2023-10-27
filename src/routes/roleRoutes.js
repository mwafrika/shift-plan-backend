import { Router } from "express";
import {
  getRole,
  getRoles,
  createNewRole,
  updateExistingRole,
  deleteExistingRole
} from "../controllers/role";
import { validateID } from "../middleware/validateInput";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";
import ROLES from "../utils/constant";

const router = Router()
  .get(
    "/",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    getRoles
  )
  .get(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    getRole
  )
  .post("/", auth, permit(ROLES.SUPERADMIN), createNewRole)
  .patch(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN),
    validateID,
    updateExistingRole
  )
  .delete(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN),
    validateID,
    deleteExistingRole
  );

export default router;
