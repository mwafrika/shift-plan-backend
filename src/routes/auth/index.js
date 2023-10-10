import { Router } from "express";
import {
  login,
  register,
  forgetPassword,
  resetPassword,
  getAllUsers,
  removeUser,
  updateUserAndCompanyById,
} from "../../controllers/auth";
import {
  validateUserData,
  validateCompanyData,
  validateID,
} from "../../middleware/validateInput";

const router = Router()
  .post("/login", login)
  .post("/register", validateUserData, register)
  .post("/forget-password", forgetPassword)
  .post("/reset-password/:id/:token", resetPassword)
  .get("/users", getAllUsers)
  .delete("/users/:id", validateID, removeUser)
  .patch("/users/:id/company", validateID, updateUserAndCompanyById);

export default router;
