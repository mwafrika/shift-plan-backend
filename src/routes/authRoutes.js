import { Router } from "express";
import {
  register,
  forgetPassword,
  resetPassword,
  login
} from "../controllers/auth";
import { validateUserData, validateID } from "../middleware/validateInput";

const router = Router()
  .post("/register", validateUserData, register)
  .post("/login", login)
  .post("/forget-password", forgetPassword)
  .post("/reset-password/:id/:token", validateID, resetPassword);

export default router;
