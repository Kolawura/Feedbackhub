import express from "express";
const router = express.Router();
import {
  addNewSite,
  getSiteIds,
  validateSiteId,
} from "../controllers/siteController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/all", protect, getSiteIds);
router.post("/add", protect, addNewSite);
router.get("/:sideId", validateSiteId);

export default router;
