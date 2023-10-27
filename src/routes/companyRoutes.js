import { Router } from "express";
import {
  updateCompanyById,
  getCompany,
  deleteExistingCompany,
  ApproveDenyCompany,
  getAllCompanies
} from "../controllers/company";
import { validateID, validateStatus } from "../middleware/validateInput";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";
import ROLES from "../utils/constant";

const router = Router()
  .get("/:id", auth, permit(ROLES.SUPERADMIN), validateID, getCompany)
  .get("/", auth, permit(ROLES.SUPERADMIN), getAllCompanies)
  .delete(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN),
    validateID,
    deleteExistingCompany
  )
  .patch(
    "/:id",
    auth,
    permit(ROLES.SUPERADMIN),
    validateID,
    updateCompanyById
  )
  .patch(
    "/:id/status",
    auth,
    permit(ROLES.SUPERADMIN),
    validateID,
    validateStatus,
    ApproveDenyCompany
  );

export default router;
