import { Router } from "express";

import {
  createNewDepartment,
  findAllDepartment,
  findDepartmentById,
  removeDepartment,
  updateDepartmentById
} from "../controllers/department";
import {
  validateDepartmentData,
  validateID
} from "../middleware/validateInput";
import ROLES from "../utils/constant";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";
import { getUsersPerDepartment } from "../controllers/auth";

console.log("ROLES", ROLES);
const router = Router()
  .get(
    "/",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER, ROLES.EMPLOYEE),
    findAllDepartment
  )
  .post(
    "/create",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateDepartmentData,
    createNewDepartment
  )
  .patch(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    validateDepartmentData,
    updateDepartmentById
  )
  .delete(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    removeDepartment
  )
  .get(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    findDepartmentById
  )
  .get(
    "/:id/users",
    auth,
    permit(ROLES.SUPERADMIN, ROLES.ADMIN, ROLES.MANAGER),
    validateID,
    getUsersPerDepartment
  );

export default router;
