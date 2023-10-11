import { Router } from "express";
import { updateCompanyById } from "../controllers/company";
import { validateID } from "../middleware/validateInput";

const router = Router().patch("/:id", validateID, updateCompanyById);
export default router;
