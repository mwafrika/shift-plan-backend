import { Router } from "express";
import { getCompanies } from "../../controllers/company";

const router = Router()
  .get("/", getCompanies)

export default router;