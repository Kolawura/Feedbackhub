import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getMe,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  updateAdmin,
  deleteAdmin,
} from "../controllers/authController.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import { validate } from "../middleware/zodValidate.js";
import { authLimiter, emailLimiter } from "../middleware/rateLimiter.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public
router.get("/me", getMe);
router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", authLimiter, validate(loginSchema), loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

// Email verification
router.get("/verify-email", emailLimiter, verifyEmail);
router.post("/resend-verification", emailLimiter, resendVerification);

// Password reset
router.post("/forgot-password", emailLimiter, forgotPassword);
router.post("/reset-password", emailLimiter, resetPassword);

// Protected
router.patch("/profile", protect, updateAdmin);
router.delete("/account", protect, deleteAdmin);

export default router;
