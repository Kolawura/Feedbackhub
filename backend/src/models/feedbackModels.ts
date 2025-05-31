import mongoose, { Document, Model, Schema } from "mongoose";
import { IFeedback } from "../Type/Type";

const feedbackSchema: Schema<IFeedback> = new mongoose.Schema(
  {
    siteId: {
      type: String,
      required: true,
      index: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    name: {
      type: String,
      default: "Anonymous",
      trim: true,
    },
    userInfo: {
      browser: String,
      os: String,
      ip: String,
      location: String,
      email: String,
    },
    type: {
      type: String,
      enum: ["bug", "feature", "other"],
      default: "other",
    },
  },
  {
    timestamps: true,
  }
);

const Feedback: Model<IFeedback> = mongoose.model<IFeedback>(
  "Feedback",
  feedbackSchema
);
export default Feedback;
