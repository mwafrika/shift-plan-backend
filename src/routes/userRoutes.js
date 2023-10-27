import { Router } from "express";
import {
  getUser,
  getUsers,
  deleteUserData,
  updateUserData,
  createUserData,
  updateUserRole
} from "../controllers/auth";
import { validateID, validateUserInfo } from "../middleware/validateInput";
import isAuthenticated from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import ROLES from "../utils/constant";

const router = Router()
  .get(
    "/",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    getUsers
  )
  .get(
    "/:id",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    getUser
  )
  .post(
    "/",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateUserInfo,
    createUserData
  )
  .patch(
    "/:id",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    updateUserData
  )
  .delete(
    "/:id/company",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    deleteUserData
  )
  .patch(
    "/:id/role",
    isAuthenticated,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    updateUserRole
  );

export default router;
