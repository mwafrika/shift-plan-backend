import { Router } from "express";
import AuthRoutes from "./authRoutes";
import ShiftRoutes from "./shiftRoutes";
import UserRoutes from "./userRoutes";
import RoleRoutes from "./roleRoutes";
import DepartmentRoutes from "./departmentRoutes";
import CompanyRoutes from "./companyRoutes";
import userProfile from "./userProfileRoute";
import Absence from "./absence";

const router = Router()
  .use("/auth", AuthRoutes)
  .use("/shifts", ShiftRoutes)
  .use("/users", UserRoutes)
  .use("/roles", RoleRoutes)
  .use("/departments", DepartmentRoutes)
  .use("/companies", CompanyRoutes)
  .use("/absences", Absence)
  .use("/profile", userProfile);

export default router;
