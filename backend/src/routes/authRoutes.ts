import express from "express";
import { registerAdmin, loginAdmin } from "../controllers/authController";
import { loginSchema, registerSchema } from "../schema/authSchema";
import { validate } from "../middleware/zodValidate";

const router = express.Router();

router.post("/register", validate(registerSchema), registerAdmin);
router.post("/login", validate(loginSchema), loginAdmin);

export default router;
