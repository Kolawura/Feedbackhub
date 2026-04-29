import mongoose, { Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { AdminDocument } from "../Type/Type.js";

const SiteSchema = new mongoose.Schema(
  {
    siteId: { type: String, required: true },
    name: { type: String, required: true },
  },
  { _id: false },
);

const adminSchema: Schema<AdminDocument> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    AdminSite: [SiteSchema],

    // ── Email verification ──────────────────────────────────────────────
    emailVerified: { type: Boolean, default: false },
    verificationToken: { type: String, default: null },
    verificationExpiry: { type: Date, default: null },

    // ── Password reset ──────────────────────────────────────────────────
    passwordResetToken: { type: String, default: null },
    passwordResetExpiry: { type: Date, default: null },

    // ── JWT refresh token rotation ──────────────────────────────────────
    // Incremented on every logout or suspicious refresh.
    // The refresh token payload carries a `version` claim that must match.
    refreshTokenVersion: { type: Number, default: 0 },
  },
  { timestamps: true },
);

// Hash password before saving
adminSchema.pre<AdminDocument>("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err as Error);
  }
});

adminSchema.methods.matchPassword = async function (
  this: AdminDocument,
  enteredPassword: string,
): Promise<boolean> {
  return bcrypt.compare(enteredPassword, this.password);
};

// Indexes for token lookups
adminSchema.index({ verificationToken: 1 });
adminSchema.index({ passwordResetToken: 1 });

const Admin: Model<AdminDocument> = mongoose.model<AdminDocument>(
  "Admin",
  adminSchema,
);

export default Admin;
