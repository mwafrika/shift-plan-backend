import { Router } from "express";
import {
  getUser,
  getUsers,
  deleteUserData,
  updateUserData,
  createUserData
} from "../controllers/auth";
import { validateUserData, validateID } from "../middleware/validateInput";
import isAuthenticated from "../middleware/authenticate.user";

const router = Router()
  .get("/", isAuthenticated, getUsers)
  .get("/:id", validateID, isAuthenticated, getUser)
  .post("/", validateUserData, createUserData, createUserData)
  .patch("/:id", validateID, isAuthenticated, updateUserData)
  .delete("/:id", validateID, isAuthenticated, deleteUserData);

export default router;
