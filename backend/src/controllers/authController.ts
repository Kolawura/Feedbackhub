import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModels";
import { registerSchema } from "../schema/authSchema";

// Generate JWT token
const generateToken = (adminId: string): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret)
    throw new Error("JWT_SECRET is not defined in environment variables");

  return jwt.sign({ id: adminId }, secret, { expiresIn: "7d" });
};

// @desc    Register new admin
// @route   POST /api/auth/register
// @access  Public
export const registerAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const validateAuth = registerSchema.safeParse(req.body);

  if (!validateAuth.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: validateAuth.error.flatten().fieldErrors,
    });
    return;
  }

  const { firstName, lastName, email, username, password } = validateAuth.data;

  try {
    const usernameExists = await Admin.findOne({ username });
    const emailExists = await Admin.findOne({ email });

    if (usernameExists || emailExists) {
      res.status(400).json({
        success: false,
        message: usernameExists
          ? "Username already in use"
          : "Email already in use",
      });
      return;
    }

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      username,
      email,
      password,
    });

    const token = generateToken(newAdmin._id.toString());

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        _id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        username: newAdmin.username,
        email: newAdmin.email,
        token,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { identifier, password } = req.body;

  try {
    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const token = generateToken(admin._id.toString());

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({
      success: false,
      message: "Server error during login",
    });
  }
};
