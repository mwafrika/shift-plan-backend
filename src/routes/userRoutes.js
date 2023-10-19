import { Router } from "express";
import {
  getUser,
  getUsers,
  deleteUserData,
  updateUserData,
  createUserData
} from "../controllers/auth";
import { validateUserData, validateID } from "../middleware/validateInput";
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
    validateUserData,
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
    "/:id/company/:companyId",
    isAuthenticated,
    permit("admin", "superAdmin", "manager"),
    validateID,
    deleteUserData
  );

export default router;
