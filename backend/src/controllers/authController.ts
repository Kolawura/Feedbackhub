import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import Admin from "../models/adminModels.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";

// Generate JWT token
const generateTokens = (adminId: string) => {
  const secret = process.env.JWT_SECRET!;
  const refreshSecret = process.env.JWT_REFRESH_SECRET!;

  const accessToken = jwt.sign({ id: adminId }, secret, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ id: adminId }, refreshSecret, {
    expiresIn: "7d",
  });

  return { accessToken, refreshToken };
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

    const { accessToken, refreshToken } = generateTokens(
      newAdmin._id.toString()
    );

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      success: true,
      message: "Admin registered successfully",
      data: {
        _id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        username: newAdmin.username,
        email: newAdmin.email,
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
  const validateAuth = loginSchema.safeParse(req.body);

  if (!validateAuth.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: validateAuth.error.flatten().fieldErrors,
    });
    return;
  }

  const { identifier, password } = validateAuth.data;

  try {
    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!admin || !(await admin.matchPassword(password))) {
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(admin._id.toString());

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
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

export const getMe = async (req: Request, res: Response): Promise<void> => {
  console.log("Fetching admin details");
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!);
    const admin = await Admin.findById((decoded as any).id).select("-password");

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin details retrieved successfully",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const refreshAccessToken = async (
  req: Request,
  res: Response
): Promise<void> => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({ success: false, message: "No refresh token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
    };
    if (!decoded || !decoded.id) {
      res
        .status(403)
        .json({ success: false, message: "Invalid refresh token" });
      return;
    }
    const accessToken = jwt.sign({ id: decoded.id }, process.env.JWT_SECRET!, {
      expiresIn: "15m",
    });

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 15 * 60 * 1000,
    });

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Access token refreshed",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Refresh token error:", error);
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

// @desc Logout admin
// @route POST /api/auth/logout
// @access Public
export const logoutAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.clearCookie("accessToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  res.status(200).json({ success: true, message: "Logged out successfully" });
};
