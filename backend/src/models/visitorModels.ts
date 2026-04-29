import mongoose, { Document, Model, Schema } from "mongoose";
import { IPageVisit, IVisitor } from "../Type/Type.js";

const PageVisitSchema = new Schema<IPageVisit>({
  url: { type: String, required: true },
  timestamp: { type: Date },
});

const VisitorSchema: Schema = new Schema<IVisitor>(
  {
    siteId: { type: String, required: true },
    visitorId: { type: String, required: true },
    visitTimestamp: { type: Date, required: true },
    sessionId: { type: String, default: null },
    sessionStart: { type: Date, required: true },
    page: { type: String, required: true },
    userInfo: {
      userAgent: String,
      language: String,
      platform: String,
      screenWidth: Number,
      screenHeight: Number,
      timezoneOffset: Number,
    },
    country: { type: String, default: "Unknown" },
    region: { type: String, default: "" },
    city: { type: String, default: "" },
    pagesVisited: { type: [PageVisitSchema], default: [] },
  },
  { timestamps: true },
);

// Speeds up all groupBy-visitorId queries dramatically
VisitorSchema.index({ siteId: 1, visitTimestamp: -1 });
VisitorSchema.index({ visitorId: 1 });
VisitorSchema.index({ siteId: 1, visitorId: 1 });

const Visitor: Model<IVisitor> = mongoose.model<IVisitor>(
  "Visitor",
  VisitorSchema,
);
export default Visitor;
