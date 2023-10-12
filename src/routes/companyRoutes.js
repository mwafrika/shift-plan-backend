import { Router } from "express";
import { getCompany, deleteExistingCompany } from "../controllers/company";
import { validateIdOnly } from "../services/auth/schema";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";

const router = Router()
  .get(
    "/:id",
    auth,
    permit("superAdmin"),
    validateIdOnly,
    getCompany
  )
  .delete(
    "/:id",
    auth,
    permit("superAdmin"),
    validateIdOnly,
    deleteExistingCompany
  );

export default router;
