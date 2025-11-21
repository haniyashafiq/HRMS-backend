import { Router } from "express";
import { getCompanies } from "../controllers/company.controller.js";
import { getPositionsByCompany } from "../controllers/position.controller.js";

const router = Router();

router.get("/", getCompanies);
router.get("/:companyId/positions", getPositionsByCompany);

export default router;
