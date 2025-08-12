import mongoose, { Document, Model, Schema } from "mongoose";
import { ISite } from "../Type/Type.js";

const SiteSchema = new Schema<ISite>(
  {
    name: { type: String, required: true },
    siteId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const Site: Model<ISite> = mongoose.model<ISite>("Site", SiteSchema);
export default Site;
