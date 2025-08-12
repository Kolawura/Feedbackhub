import express from "express";
const router = express.Router();
import { validateSiteId } from "../controllers/siteController.js";

router.get("/:sideId", validateSiteId);

export default router;
