import { Router } from "express";

// Import feature routes
import applicantRoutes from "./applicant.route.js";
import authRoutes from "./auth.routes.js";
// Add more routes as you build features…

const router = Router();

/**
 * API Health Check
 */
router.get("/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date() });
});

/**
 * Register all route groups

 * /api/applicants → applicantRoutes
 */

router.use("/applicants", applicantRoutes);
router.use("/auth", authRoutes);
// Always export a single router
export default router;
