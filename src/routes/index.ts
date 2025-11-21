import { Router } from "express";

// Import feature routes
import applicantRoutes from "./applicant.route.js";
import authRoutes from "./auth.routes.js";
import companiesRoutes from "./companies.routes.js";
import applicationsRoutes from "./applications.routes.js";
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
router.use("/companies", companiesRoutes);
router.use("/applications", applicationsRoutes);
// Always export a single router
export default router;
