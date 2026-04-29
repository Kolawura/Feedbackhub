import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import bcrypt from "bcryptjs";
import Admin from "../models/adminModels.js";
import { loginSchema, registerSchema } from "../schema/authSchema.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from "../utils/email.js";
import {
  generateTokens,
  setTokenCookies,
  clearTokenCookies,
} from "../utils/token.js";

// ─── Register ─────────────────────────────────────────────────────────────────
// @route POST /api/auth/register
export const registerAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = registerSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { firstName, lastName, email, username, password } = parsed.data;

  try {
    const [usernameExists, emailExists] = await Promise.all([
      Admin.findOne({ username }),
      Admin.findOne({ email }),
    ]);

    if (usernameExists || emailExists) {
      res.status(400).json({
        success: false,
        message: usernameExists
          ? "Username already in use"
          : "Email already in use",
      });
      return;
    }

    // Generate a secure random verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

    const newAdmin = await Admin.create({
      firstName,
      lastName,
      username,
      email,
      password,
      emailVerified: false,
      verificationToken,
      verificationExpiry,
      refreshTokenVersion: 0,
    });

    // Send verification email (non-blocking — don't fail registration if email fails)
    sendVerificationEmail(email, firstName, verificationToken).catch((err) =>
      console.error("Verification email failed:", err),
    );

    // Issue tokens — user can use the app before verifying email,
    // but certain actions can be gated on emailVerified if needed
    const { accessToken, refreshToken } = generateTokens(
      newAdmin._id.toString(),
      newAdmin.refreshTokenVersion,
    );
    setTokenCookies(res, accessToken, refreshToken);

    res.status(201).json({
      success: true,
      message: "Registered successfully. Please verify your email.",
      data: {
        _id: newAdmin._id,
        firstName: newAdmin.firstName,
        lastName: newAdmin.lastName,
        username: newAdmin.username,
        email: newAdmin.email,
        emailVerified: newAdmin.emailVerified,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during registration" });
  }
};

// ─── Verify email ─────────────────────────────────────────────────────────────
// @route GET /api/auth/verify-email?token=xxx
export const verifyEmail = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token } = req.query;

  if (!token || typeof token !== "string") {
    res.status(400).json({ success: false, message: "Invalid token" });
    return;
  }

  try {
    const admin = await Admin.findOne({
      verificationToken: token,
      verificationExpiry: { $gt: new Date() }, // not expired
    });

    if (!admin) {
      res.status(400).json({
        success: false,
        message: "Verification link is invalid or has expired.",
      });
      return;
    }

    admin.emailVerified = true;
    admin.verificationToken = null;
    admin.verificationExpiry = null;
    await admin.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully. You can now sign in.",
    });
  } catch (error) {
    console.error("Email verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Resend verification email ────────────────────────────────────────────────
// @route POST /api/auth/resend-verification
export const resendVerification = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }

  try {
    const admin = await Admin.findOne({ email });

    // Always return success — never reveal whether an email exists
    if (!admin || admin.emailVerified) {
      res.status(200).json({
        success: true,
        message:
          "If that email exists and is unverified, a new link has been sent.",
      });
      return;
    }

    const verificationToken = crypto.randomBytes(32).toString("hex");
    const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);

    admin.verificationToken = verificationToken;
    admin.verificationExpiry = verificationExpiry;
    await admin.save();

    sendVerificationEmail(email, admin.firstName, verificationToken).catch(
      (err) => console.error("Resend verification failed:", err),
    );

    res.status(200).json({
      success: true,
      message:
        "If that email exists and is unverified, a new link has been sent.",
    });
  } catch (error) {
    console.error("Resend verification error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Login ────────────────────────────────────────────────────────────────────
// @route POST /api/auth/login
export const loginAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: parsed.error.flatten().fieldErrors,
    });
    return;
  }

  const { identifier, password } = parsed.data;

  try {
    const admin = await Admin.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    });

    if (!admin || !(await admin.matchPassword(password))) {
      // Same message for both cases — don't reveal whether account exists
      res.status(401).json({ success: false, message: "Invalid credentials" });
      return;
    }

    const { accessToken, refreshToken } = generateTokens(
      admin._id.toString(),
      admin.refreshTokenVersion,
    );
    setTokenCookies(res, accessToken, refreshToken);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
        emailVerified: admin.emailVerified,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, message: "Server error during login" });
  }
};

// ─── Get current admin ────────────────────────────────────────────────────────
// @route GET /api/auth/me
export const getMe = async (req: Request, res: Response): Promise<void> => {
  try {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET!) as {
      id: string;
    };
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Admin details retrieved",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
        emailVerified: admin.emailVerified,
      },
    });
  } catch {
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

// ─── Refresh access token (with rotation) ────────────────────────────────────
// @route POST /api/auth/refresh-token
// Fix #5: Validates version claim to detect stolen/replayed refresh tokens
export const refreshAccessToken = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const token = req.cookies.refreshToken;

  if (!token) {
    res.status(401).json({ success: false, message: "No refresh token" });
    return;
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET!) as {
      id: string;
      version?: number;
    };

    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    // Version mismatch means this token was already rotated or invalidated.
    // This catches replay attacks with stolen refresh tokens.
    if (decoded.version !== admin.refreshTokenVersion) {
      // Suspicious — clear cookies and force re-login
      clearTokenCookies(res);
      res.status(403).json({
        success: false,
        message: "Session expired. Please sign in again.",
      });
      return;
    }

    // Rotate: increment version so the old token can never be reused
    admin.refreshTokenVersion += 1;
    await admin.save();

    const { accessToken, refreshToken: newRefreshToken } = generateTokens(
      admin._id.toString(),
      admin.refreshTokenVersion,
    );
    setTokenCookies(res, accessToken, newRefreshToken);

    res.status(200).json({
      success: true,
      message: "Token refreshed",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
        emailVerified: admin.emailVerified,
      },
    });
  } catch (error) {
    clearTokenCookies(res);
    res.status(403).json({ success: false, message: "Invalid refresh token" });
  }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
// @route POST /api/auth/logout
// Incrementing refreshTokenVersion invalidates ALL existing refresh tokens
// for this admin — works as a "logout from all devices" mechanism
export const logoutAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Invalidate all refresh tokens by bumping the version
    if (req.cookies.refreshToken) {
      const decoded = jwt.verify(
        req.cookies.refreshToken,
        process.env.JWT_REFRESH_SECRET!,
      ) as { id: string };

      await Admin.updateOne(
        { _id: decoded.id },
        { $inc: { refreshTokenVersion: 1 } },
      );
    }
  } catch {
    // If token is already invalid/expired, still clear cookies
  }

  clearTokenCookies(res);
  res.status(200).json({ success: true, message: "Logged out successfully" });
};

// ─── Forgot password ──────────────────────────────────────────────────────────
// @route POST /api/auth/forgot-password
export const forgotPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({ success: false, message: "Email is required" });
    return;
  }

  try {
    const admin = await Admin.findOne({ email });

    // Always respond the same way — never reveal whether email exists
    if (!admin) {
      res.status(200).json({
        success: true,
        message: "If that email is registered, a reset link has been sent.",
      });
      return;
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    admin.passwordResetToken = resetToken;
    admin.passwordResetExpiry = resetExpiry;
    await admin.save();

    sendPasswordResetEmail(email, admin.firstName, resetToken).catch((err) =>
      console.error("Password reset email failed:", err),
    );

    res.status(200).json({
      success: true,
      message: "If that email is registered, a reset link has been sent.",
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Reset password ───────────────────────────────────────────────────────────
// @route POST /api/auth/reset-password
export const resetPassword = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { token, password } = req.body;

  if (!token || !password) {
    res
      .status(400)
      .json({ success: false, message: "Token and password are required" });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters",
    });
    return;
  }

  try {
    const admin = await Admin.findOne({
      passwordResetToken: token,
      passwordResetExpiry: { $gt: new Date() }, // not expired
    });

    if (!admin) {
      res.status(400).json({
        success: false,
        message: "Reset link is invalid or has expired.",
      });
      return;
    }

    // Hash new password manually to avoid double-hash from pre-save hook
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Use updateOne to bypass the pre-save hook entirely
    await Admin.updateOne(
      { _id: admin._id },
      {
        $set: {
          password: hashed,
          passwordResetToken: null,
          passwordResetExpiry: null,
          refreshTokenVersion: admin.refreshTokenVersion + 1, // invalidate all sessions
        },
      },
    );

    // Clear cookies in case they're logged in on another device
    clearTokenCookies(res);

    res.status(200).json({
      success: true,
      message:
        "Password reset successfully. Please sign in with your new password.",
    });
  } catch (error) {
    console.error("Reset password error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ─── Update profile ───────────────────────────────────────────────────────────
// @route PATCH /api/auth/profile
export const updateAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const adminId = req.admin?._id;
  if (!adminId) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { firstName, lastName, username, email, currentPassword, newPassword } =
    req.body;

  try {
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    if (newPassword) {
      if (!currentPassword) {
        res
          .status(400)
          .json({ success: false, message: "Current password is required" });
        return;
      }
      const isMatch = await admin.matchPassword(currentPassword);
      if (!isMatch) {
        res
          .status(400)
          .json({ success: false, message: "Current password is incorrect" });
        return;
      }
      // Bypass pre-save hook to avoid double-hash
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(newPassword, salt);
      await Admin.updateOne({ _id: adminId }, { $set: { password: hashed } });
    }

    if (username && username !== admin.username) {
      const taken = await Admin.findOne({ username });
      if (taken) {
        res
          .status(400)
          .json({ success: false, message: "Username already taken" });
        return;
      }
      admin.username = username;
    }

    if (email && email !== admin.email) {
      const taken = await Admin.findOne({ email });
      if (taken) {
        res
          .status(400)
          .json({ success: false, message: "Email already in use" });
        return;
      }
      // Require re-verification when email changes
      const verificationToken = crypto.randomBytes(32).toString("hex");
      const verificationExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000);
      admin.email = email;
      admin.emailVerified = false;
      admin.verificationToken = verificationToken;
      admin.verificationExpiry = verificationExpiry;
      sendVerificationEmail(email, admin.firstName, verificationToken).catch(
        (err) => console.error("Re-verification email failed:", err),
      );
    }

    if (firstName) admin.firstName = firstName;
    if (lastName) admin.lastName = lastName;

    await admin.save();

    res.status(200).json({
      success: true,
      message: "Profile updated",
      data: {
        _id: admin._id,
        firstName: admin.firstName,
        lastName: admin.lastName,
        username: admin.username,
        email: admin.email,
        emailVerified: admin.emailVerified,
      },
    });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// @des
// @route DELETE /api/auth/account
export const deleteAdmin = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const adminId = req.admin?._id;
  if (!adminId) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  try {
    const Site = (await import("../models/siteModels.js")).default;
    const Feedback = (await import("../models/feedbackModels.js")).default;
    const Visitor = (await import("../models/visitorModels.js")).default;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    const siteIds = admin.AdminSite.map((s) => s.siteId);

    await Promise.all([
      Feedback.deleteMany({ siteId: { $in: siteIds } }),
      Visitor.deleteMany({ siteId: { $in: siteIds } }),
      Site.deleteMany({ siteId: { $in: siteIds } }),
    ]);

    await Admin.findByIdAndDelete(adminId);
    clearTokenCookies(res);

    res.status(200).json({
      success: true,
      message: "Account and all associated data deleted",
    });
  } catch (error) {
    console.error("Account deletion error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
