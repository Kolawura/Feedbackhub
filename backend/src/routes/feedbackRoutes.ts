import express from "express";
import {
  submitFeedback,
  getFeedbackForSite,
  getFeedbackByVisitor,
} from "../controllers/feedbackController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", submitFeedback);

router.get("/:siteId", protect, getFeedbackForSite);

router.get("/by-visitor/:visitorId", protect, getFeedbackByVisitor);

export default router;
