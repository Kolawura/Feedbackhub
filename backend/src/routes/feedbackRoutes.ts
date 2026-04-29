import express from "express";
import {
  submitFeedback,
  getFeedbackForSite,
  getFeedbackByVisitor,
  getDashboardAnalytics,
  getAdminFeedbacks,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";
import { feedbackLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/", feedbackLimiter, submitFeedback);
router.get("/allFeedbacks", protect, getAdminFeedbacks);
router.get("/analytics", protect, getDashboardAnalytics);
router.get("/by-visitor/:visitorId", protect, getFeedbackByVisitor);
router.get("/analytics/:siteId", protect, getDashboardAnalytics);
router.get("/:siteId", protect, getFeedbackForSite);

export default router;
