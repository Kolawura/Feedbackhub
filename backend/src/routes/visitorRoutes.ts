import express from "express";
import {
  trackVisitor,
  getAnalytics,
  appendPageVisit,
} from "../controllers/visitorController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/track", trackVisitor);

router.post("/track-page-visit", appendPageVisit);

router.get("/analytics/:siteId", protect, getAnalytics);

export default router;
