import mongoose, { Document, Schema } from "mongoose";
import { IPageVisit, IVisitor } from "../Type/Type";

const PageVisitSchema = new Schema<IPageVisit>({
  url: { type: String, required: true },
  timestamp: { type: Date },
});

const VisitorSchema: Schema = new Schema<IVisitor>(
  {
    siteId: { type: String, required: true },
    visitorId: { type: String, required: true },
    visitTimestamp: { type: Date, required: true },
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
  { timestamps: true }
);

export default mongoose.model<IVisitor>("Visitor", VisitorSchema);
