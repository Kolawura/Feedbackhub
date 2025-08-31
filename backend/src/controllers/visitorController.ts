import { Request, Response } from "express";
import Visitor from "../models/visitorModels.js";
import { visitorSchema } from "../schema/visitorSchema.js";

// @desc    Track visitor with geolocation
// @route   POST /api/visitor/track
// @access  Public
export const trackVisitor = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const validateVisitor = visitorSchema.safeParse(req.body);

    if (!validateVisitor.success) {
      res.status(400).json({
        success: false,
        message: "Invalid input",
        errors: validateVisitor.error.flatten().fieldErrors,
      });
      return;
    }
    const visitorData = await Visitor.create(validateVisitor);
    res.status(201).json({
      success: false,
      message: "Visitor tracked",
      data: visitorData,
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
// @route   GET /api/visitor/analytics/:siteId
// @access  Private (Admin)
export const getAnalytics = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId } = req.params;
  const { range } = req.query; // e.g. "30days", "12months", "7days", "4weeks", "24hours"

  try {
    let startDate = new Date();
    let groupFormat: string;

    switch (range) {
      case "30days":
        startDate.setDate(startDate.getDate() - 30);
        groupFormat = "%d"; // group by day
        break;
      case "12months":
        startDate.setFullYear(startDate.getFullYear() - 1);
        groupFormat = "%b"; // group by month name (Jan, Feb…)
        break;
      case "7days":
        startDate.setDate(startDate.getDate() - 7);
        groupFormat = "%a"; // group by weekday (Mon, Tue…)
        break;
      case "4weeks":
        startDate.setDate(startDate.getDate() - 28);
        groupFormat = "%G-W%V";
        // ISO year-week format e.g. "2025-W33"
        break;
      case "24hours":
        startDate.setDate(startDate.getDate() - 1);
        groupFormat = "%H:00"; // group by hour
        break;
      default:
        startDate.setDate(startDate.getDate() - 30);
        groupFormat = "%d";
    }

    const visitors = await Visitor.aggregate([
      { $match: { siteId, visitTimestamp: { $gte: startDate } } },
      {
        $group: {
          _id: {
            $dateToString: { format: groupFormat, date: "$visitTimestamp" },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const labels = visitors.map((v) => v._id);
    const data = visitors.map((v) => v.count);

    res.status(200).json({
      labels,
      data,
      label: range,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch analytics" });
  }
};
