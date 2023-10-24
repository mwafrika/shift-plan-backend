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

const router = Router()
  .get("/:id", auth, permit("superAdmin"), validateID, getCompany)
  .get("/", auth, permit("superAdmin"), getAllCompanies)
  .delete("/:id", auth, permit("superAdmin"), validateID, deleteExistingCompany)
  .patch("/:id", validateID, updateCompanyById)
  .patch(
    "/:id/status",
    auth,
    permit("superAdmin"),
    validateID,
    validateStatus,
    ApproveDenyCompany
  );

export default router;
