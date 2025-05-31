import express from "express";
import {
  submitFeedback,
  getFeedbackForSite,
} from "../controllers/feedbackController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", submitFeedback);

router.get("/:siteId", protect, getFeedbackForSite);

export default router;
