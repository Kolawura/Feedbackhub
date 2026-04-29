import express from "express";
import {
  trackVisitor,
  getAnalytics,
  appendPageVisit,
  getVisitorInsights,
  getAllVisitors,
  getVisitorDetail,
} from "../controllers/visitorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.post("/track", trackVisitor);
router.post("/track-page-visit", appendPageVisit);

// Private — analytics
router.get("/analytics", protect, getAnalytics);
router.get("/analytics/:siteId", protect, getAnalytics);

// Private — insights
router.get("/insights", protect, getVisitorInsights);
router.get("/insights/:siteId", protect, getVisitorInsights);

// Private — visitor list and detail
router.get("/all", protect, getAllVisitors);
router.get("/all/:siteId", protect, getAllVisitors);
router.get("/detail/:visitorId", protect, getVisitorDetail);
export default router;
