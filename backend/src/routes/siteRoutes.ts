import express from "express";
const router = express.Router();
import {
  addNewSite,
  deleteSite,
  getSiteIds,
  renameSite,
  updateSiteConfig,
  validateSiteId,
} from "../controllers/siteController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/all", protect, getSiteIds);
router.post("/add", protect, addNewSite);
router.patch("/rename/:siteId", protect, renameSite);
router.patch("/config/:siteId", protect, updateSiteConfig);
router.delete("/:siteId", protect, deleteSite);
router.get("/:siteId", validateSiteId);

export default router;
