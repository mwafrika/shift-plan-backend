import { Router } from "express";
import { register } from "../../controllers/auth";
import { validateUserData } from "../../middleware/validateInput";

const router = Router().post("/register", validateUserData, register);

export default router;
