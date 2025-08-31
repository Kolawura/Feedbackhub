import express from "express";
import {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
  getMe,
} from "../controllers/authController.js";
import { addNewSite } from "../controllers/siteController.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import { validate } from "../middleware/zodValidate.js";

const router = express.Router();

router.get("/me", getMe);
router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", validate(loginSchema), loginAdmin);
router.post("/logout", logoutAdmin);
router.post("/refresh-token", refreshAccessToken);

export default router;
