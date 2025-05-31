import { Request, Response } from "express";
import fetch from "node-fetch";
import Visitor from "../models/visitorModels";

interface VisitorData {
  siteId: string;
  visitorId: string;
  visitTimestamp: Date;
  sessionStart: Date;
  page: string;
  userInfo: {
    userAgent?: string;
    language?: string;
    platform?: string;
    screenWidth?: number;
    screenHeight?: number;
    timezoneOffset?: number;
  };
  country?: string;
  region?: string;
  city?: string;
}

export const trackVisitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const visitorData: VisitorData = req.body;

    // IP detection
    let ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "";

    if (ip.includes(",")) ip = ip.split(",")[0].trim();
    if (ip === "::1" || ip === "127.0.0.1") ip = "8.8.8.8";

    const geoRes = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await geoRes.json();

    if (geoData.status === "success") {
      visitorData.country = geoData.country;
      visitorData.region = geoData.regionName;
      visitorData.city = geoData.city;
    } else {
      visitorData.country = "Unknown";
      visitorData.region = "";
      visitorData.city = "";
    }

    visitorData.visitTimestamp = new Date(visitorData.visitTimestamp);
    visitorData.sessionStart = new Date(visitorData.sessionStart);

    const visitorRecord = new Visitor(visitorData);
    await visitorRecord.save();

    res.status(201).json({ message: "Visitor tracked", visitorRecord });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};
