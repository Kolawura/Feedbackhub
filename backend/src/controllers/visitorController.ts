import { Request, Response } from "express";
import fetch from "node-fetch";
import Visitor from "../models/visitorModels";

// @desc    Track visitor with geolocation
// @route   POST /api/visitors/track
// @access  Public
export const trackVisitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const visitorData = req.body;

    let ip =
      (req.headers["x-forwarded-for"] as string) ||
      req.socket.remoteAddress ||
      "";

    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }

    // Fetch geolocation data
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

    // Convert timestamps to Date objects
    visitorData.visitTimestamp = new Date(visitorData.visitTimestamp);
    visitorData.sessionStart = new Date(visitorData.sessionStart);

    // Save to database
    const visitorRecord = new Visitor(visitorData);
    await visitorRecord.save();

    res.status(201).json({ message: "Visitor tracked", visitorRecord });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({ error: "Failed to track visitor" });
  }
};

// @desc    Get analytics summary for a site
// @route   GET /api/visitors/analytics/:siteId
// @access  Private (Admin)
export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId } = req.params;

  try {
    const visitors = await Visitor.find({ siteId });

    const totalVisitors = visitors.length;
    const totalPageViews = visitors.reduce(
      (acc, visitor) => acc + visitor.pagesVisited.length,
      0
    );

    const mostVisitedPages: Record<string, number> = {};

    visitors.forEach((visitor) => {
      visitor.pagesVisited.forEach((visit) => {
        if (visit.url) {
          mostVisitedPages[visit.url] = (mostVisitedPages[visit.url] || 0) + 1;
        }
      });
    });

    const sortedPages = Object.entries(mostVisitedPages)
      .sort((a, b) => b[1] - a[1])
      .map(([url, count]) => ({ url, count }));

    res.status(200).json({
      totalVisitors,
      totalPageViews,
      topPages: sortedPages.slice(0, 5),
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
