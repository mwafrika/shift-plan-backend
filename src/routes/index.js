import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ShiftRoutes from "./shiftRoutes";
import UserRoutes from "./userRoutes";
import RoleRoutes from "./roleRoutes";
import CompanyRoutes from "./companyRoutes";

const router = Router()
  .use("/auth", AuthRoutes)
  .use("/shifts", ShiftRoutes)
  .use("/users", UserRoutes)
  .use("/roles", RoleRoutes)
  .use("/company", CompanyRoutes);

export default router;
