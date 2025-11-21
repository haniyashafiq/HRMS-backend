import { Router } from "express";
import { apply, previewResume } from "../controllers/application.controller.js";
import { authenticateApplicant } from "../middlewares/auth.middleware.js"; // adjust path
const router = Router();

router.post("/", authenticateApplicant, apply);
router.get("/preview-resume", authenticateApplicant, previewResume);

export default router;
