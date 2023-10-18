import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ShiftRoutes from "./shiftRoutes";
import UserRoutes from "./userRoutes";

const router = Router()
  .use("/auth", AuthRoutes)
  .use("/shifts", ShiftRoutes)
  .use("/users", UserRoutes);

export default router;
