import mongoose, { Document, Model, Schema } from "mongoose";
import { ISite } from "../Type/Type.js";

const WidgetConfigSchema = new Schema(
  {
    buttonText: { type: String, default: "Feedback" },
    buttonColor: { type: String, default: "#f5a623" },
    position: {
      type: String,
      enum: ["bottom-right", "bottom-left", "top-right", "top-left"],
      default: "bottom-right",
    },
    theme: {
      type: String,
      enum: ["light", "dark", "auto"],
      default: "auto",
    },
  },
  { _id: false },
);

const SiteSchema = new Schema<ISite>(
  {
    name: { type: String, required: true },
    siteId: { type: String, required: true, unique: true },
    widgetConfig: { type: WidgetConfigSchema, default: () => ({}) },
  },
  { timestamps: true },
);

const Site: Model<ISite> = mongoose.model<ISite>("Site", SiteSchema);
export default Site;
