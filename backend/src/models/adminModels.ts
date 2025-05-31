import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { AdminDocument } from "../Type/Type";

const adminSchema: Schema<AdminDocument> = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

// Encrypt password before saving
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

// Compare login password with hashed password
adminSchema.methods.matchPassword = async function (
  this: AdminDocument,
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model<AdminDocument>("Admin", adminSchema);
export default Admin;
