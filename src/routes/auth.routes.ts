import { Router } from "express";
import { loginApplicant } from "../controllers/auth.controllers.js";

const router = Router();

router.post("/login", loginApplicant);

export default router;
