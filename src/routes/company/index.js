import { Router } from "express";
import { getAllCompanies } from "../../controllers/company";

const router = Router()
  .get("/", getAllCompanies)

export default router;