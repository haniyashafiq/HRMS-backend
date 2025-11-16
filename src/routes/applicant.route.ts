import { Router } from "express";
import { createApplicant, getApplicantById, updateApplicant } from "../controllers/applicant.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { setPassword } from "../controllers/applicant.controller.js";

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

router.get("/:id", getApplicantById);
router.put("/:id", updateApplicant);

// Set password
router.post("/:id/set-password", setPassword);

export default router;