import express from "express";
import { trackVisitor, getAnalytics } from "../controllers/visitorController";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/track", trackVisitor);

router.get("/analytics/:siteId", protect, getAnalytics);

export default router;
