import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ShiftRoutes from "./shiftRoutes";
import UserRoutes from "./userRoutes";
import RoleRoutes from "./roleRoutes";
import DepartmentRoutes from "./departmentRoutes";
import CompanyRoutes from "./companyRoutes";

const router = Router()
  .use("/auth", AuthRoutes)
  .use("/shifts", ShiftRoutes)
  .use("/users", UserRoutes)
  .use("/roles", RoleRoutes)
  .use("/departments", DepartmentRoutes)
  .use("/companies", CompanyRoutes);

export default router;
