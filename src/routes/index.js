import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ShiftRoutes from "./shiftRoutes";
import UserRoutes from "./userRoutes";
import RoleRoutes from "./roleRoutes";

const router = Router()
  .use("/auth", AuthRoutes)
  .use("/shifts", ShiftRoutes)
  .use("/users", UserRoutes)
  .use("/roles", RoleRoutes);

export default router;
