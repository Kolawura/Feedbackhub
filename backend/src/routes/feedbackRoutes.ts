import express from "express";
import {
  submitFeedback,
  getFeedbackForSite,
  getFeedbackByVisitor,
  getDashboardAnalytics,
  getAdminFeedbacks,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitFeedback);
router.get("/allFeedbacks", protect, getAdminFeedbacks);

router.get("/:siteId", protect, getFeedbackForSite);

router.get("/by-visitor/:visitorId", protect, getFeedbackByVisitor);
router.get("/analytics", protect, getDashboardAnalytics);
router.get("/analytics/:siteId", protect, getDashboardAnalytics);

export default router;
