import { Router } from "express";
import {
  getRole,
  getRoles,
  createNewRole,
  updateExistingRole,
  deleteExistingRole,
} from "../../controllers/role";
import { validateID } from "../../middleware/validateInput";

const router = Router()
  .get("/", getRoles)
  .get("/:id", getRole)
  .post("/", createNewRole)
  .patch("/:id", updateExistingRole)
  .delete("/:id", validateID, deleteExistingRole);

export default router;
