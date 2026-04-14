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
import { authLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.get("/me", getMe);
router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", authLimiter, validate(loginSchema), loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

export default router;
