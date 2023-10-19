import { Router } from "express";
import {
  getRole,
  getRoles,
  createNewRole,
  updateExistingRole,
  deleteExistingRole
} from "../controllers/role";
import { validateID } from "../middleware/validateInput";
import permit from "../middleware/permission";
import auth from "../middleware/authenticate.user";

const router = Router()
  .get("/", auth, permit("admin", "superAdmin"), getRoles)
  .get("/:id", auth, permit("admin", "superAdmin"), validateID, getRole)
  .post("/", auth, permit("admin", "superAdmin"), createNewRole)
  .patch(
    "/:id",
    auth,
    permit("admin", "superAdmin"),
    validateID,
    updateExistingRole
  )
  .delete(
    "/:id",
    auth,
    permit("admin", "superAdmin"),
    validateID,
    deleteExistingRole
  );

export default router;
