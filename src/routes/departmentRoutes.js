import { Router } from "express";

import {
  createNewDepartment,
  findAllDepartment,
  removeDepartment,
  updateDepartmentById
} from "../controllers/department";
import { validateDepartmentData, validateID } from "../middleware/validateInput";

const router = Router()
  .get("/", findAllDepartment)
  .post("/create", validateDepartmentData, createNewDepartment)
  .patch("/:id", validateID, validateDepartmentData, updateDepartmentById)
  .delete("/:id", validateID, removeDepartment);

export default router;
