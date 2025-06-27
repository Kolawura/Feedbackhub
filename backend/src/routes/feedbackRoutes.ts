import express from "express";
import {
  submitFeedback,
  getFeedbackForSite,
  getFeedbackByVisitor,
} from "../controllers/feedbackController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", submitFeedback);

router.get("/:siteId", protect, getFeedbackForSite);

router.get("/by-visitor/:visitorId", protect, getFeedbackByVisitor);

export default router;
