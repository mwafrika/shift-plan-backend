import { Router } from "express";
import ApproveDenyCompany, {
  updateCompanyById,
  getCompany,
  deleteExistingCompany
} from "../controllers/company";
import { validateID, validateStatus } from "../middleware/validateInput";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";

const router = Router()
  .get("/:id", auth, permit("superAdmin"), validateID, getCompany)
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
