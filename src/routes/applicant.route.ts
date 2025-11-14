import { Router } from "express";
import { createApplicant } from "../controllers/applicant.controller.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.post(
  "/signup",
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "resume", maxCount: 1 },
    { name: "certificates", maxCount: 10 }
  ]),
  createApplicant
);

export default router;
