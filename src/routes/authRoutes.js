import { Router } from "express";
import {
  register,
  forgetPassword,
  resetPassword,
  login,
  verifyAccount
} from "../controllers/auth";
import { validateUserData, validateID } from "../middleware/validateInput";

const router = Router()
  .post("/register", register)
  .post("/login", login)
  .post("/forget-password", forgetPassword)
  .post("/reset-password/:id/:token", validateID, resetPassword)
  .get("/verify-account/:id/:token", validateID, verifyAccount);
export default router;
