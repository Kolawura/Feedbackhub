import express from "express";
const router = express.Router();
import { addNewSite, validateSiteId } from "../controllers/siteController.js";
import { protect } from "../middleware/authMiddleware.js";

router.get("/:sideId", validateSiteId);
router.post("/add", protect, addNewSite);

export default router;
