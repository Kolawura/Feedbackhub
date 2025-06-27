import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getMe,
} from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import { validate } from "../middleware/zodValidate.js";
import { protect } from "../middleware/authMiddleware.js";
import { addNewSite } from "../controllers/siteController.js";

const router = express.Router();

router.post("/me", getMe);
router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", validate(loginSchema), loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);
router.post("/sites", protect, addNewSite);

export default router;
