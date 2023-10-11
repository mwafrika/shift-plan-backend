import { Router } from "express";
import ApproveDenyCompany from "../controllers/company";
import auth from "../middleware/authenticate.user";
import permit from "../middleware/permission";
import { validateID, validateStatus } from "../middleware/validateInput";

const router = Router().patch(
  "/:id/status",
  auth,
  permit("superAdmin"),
  validateID,
  validateStatus,
  ApproveDenyCompany
);

export default router;
