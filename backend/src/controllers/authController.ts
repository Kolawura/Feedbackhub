import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModels";

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
  const { firstName, lastName, username, email, password } = req.body;

  try {
    const usernameExists = await Admin.findOne({ username });
    const emailExists = await Admin.findOne({ email });

    if (usernameExists || emailExists) {
      res.status(400).json({
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
      _id: newAdmin._id,
      firstName: newAdmin.firstName,
      lastName: newAdmin.lastName,
      username: newAdmin.username,
      email: newAdmin.email,
      token,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
export const loginAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { identifier, password } = req.body; // identifier = username or email

  try {
    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!admin) {
      res.status(401).json({ message: "Invalid Username or Email" });
      return;
    }

    if (!(await admin.matchPassword(password))) {
      res.status(401).json({ message: "Invalid Password" });
      return;
    }

    const token = generateToken(admin._id.toString());

    res.status(200).json({
      _id: admin._id,
      firstName: admin.firstName,
      lastName: admin.lastName,
      username: admin.username,
      email: admin.email,
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};
