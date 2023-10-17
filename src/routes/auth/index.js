import { Router } from "express";
import {
  register,
  forgetPassword,
  resetPassword,
  getUser,
  getUsers,
  deleteUserData,
  updateUserData,
  createUserData,
} from "../../controllers/auth";
import { validateUserData, validateID } from "../../middleware/validateInput";
import isAuthenticated from "../../middleware/authenticate.user";

const router = Router()
  .post("/register", validateUserData, register)
  .post("/forget-password", forgetPassword)
  .post("/reset-password/:id/:token", validateID, resetPassword)
  .get("/users", isAuthenticated, getUsers)
  .get("/users/:id", validateID, isAuthenticated, getUser)
  .post("/users", validateUserData, createUserData)
  .patch("/users/:id", validateID, isAuthenticated, updateUserData)
  .delete("/users/:id", validateID, isAuthenticated, deleteUserData);

export default router;
