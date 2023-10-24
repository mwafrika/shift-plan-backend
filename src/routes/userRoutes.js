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

const router = Router()
  .get("/", isAuthenticated, permit("admin", "superAdmin", "manager"), getUsers)
  .get(
    "/:id",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    getUser
  )
  .post(
    "/",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateUserInfo,
    createUserData
  )
  .patch(
    "/:id",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    updateUserData
  )
  .delete(
    "/:id/company",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    deleteUserData
  )
  .patch(
    "/:id/role",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    updateUserRole
  );

export default router;
