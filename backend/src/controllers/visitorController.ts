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
      (req.headers["x-forwarded-for"] as string)?.split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "8.8.8.8";

    if (ip.includes(",")) {
      ip = ip.split(",")[0].trim();
    }

    if (ip === "::1" || ip === "127.0.0.1") {
      ip = "8.8.8.8";
    }

    // Fetch geolocation data
    const geoRes = await fetch(`https://ipapi.co/${ip}/json`);
    const geoData = await geoRes.json();

    if (!geoData.error) {
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

    res.status(201).json({
      success: false,
      message: "Visitor tracked",
      data: visitorRecord,
    });
  } catch (error) {
    console.error("Error tracking visitor:", error);
    res.status(500).json({
      success: false,
      message: "Failed to track visitor",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const appendPageVisit = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId, visitorId, sessionStart, page } = req.body;

  if (!siteId || !visitorId || !sessionStart || !page) {
    res.status(400).json({
      success: false,
      message: "Missing required fields",
      errors: {
        siteId: "Site ID is required",
        visitorId: "Visitor ID is required",
        sessionStart: "Session start time is required",
        page: "Page URL is required",
      },
    });
    return;
  }

  try {
    const session = await Visitor.findOne({
      siteId,
      visitorId,
      sessionStart: new Date(sessionStart),
    });

    if (!session) {
      res.status(404).json({
        success: false,
        message: "Session not found",
        errors: { session: "No session found for the given parameters" },
      });
      return;
    }
    session.pagesVisited.push({
      url: page,
      timestamp: new Date(),
    });

    await session.save();

    res.status(200).json({
      success: true,
      message: "Page visit added",
    });
  } catch (error) {
    console.error("Error appending page visit:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
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
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch analytics" });
  }
};
