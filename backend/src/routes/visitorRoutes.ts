import express from "express";
import {
  trackVisitor,
  getAnalytics,
  appendPageVisit,
  getVisitorInsights,
} from "../controllers/visitorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/track", trackVisitor);

router.post("/track-page-visit", appendPageVisit);
router.get("/insights", protect, getVisitorInsights);
router.get("/insights/:siteId", protect, getVisitorInsights);

router.get("/analytics", protect, getAnalytics);
router.get("/analytics/:siteId", protect, getAnalytics);

export default router;
