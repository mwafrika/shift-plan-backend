import { Router } from "express";
import {
  getCurrentUser,
  updateCurrentUser
} from "../controllers/auth";
import isAuthenticated from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import ROLES from "../utils/constant";

const router = Router()
  .get(
    "/me",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    getCurrentUser
  )
  .patch(
    "/me",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    updateCurrentUser
  );

export default router;
