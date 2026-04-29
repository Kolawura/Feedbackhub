import { Request, Response } from "express";
import Feedback from "../models/feedbackModels.js";
import { feedbackSchema } from "../schema/feedbackSchema.js";
import Admin from "../models/adminModels.js";
import { sanitizeFeedback } from "../utils/sanitize.js";
import Visitor from "../models/visitorModels.js";

// @desc    Submit feedback (public)
// @route   POST /api/feedback
// @access  Public
export const submitFeedback = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const validateFeedback = feedbackSchema.safeParse(req.body);

  if (!validateFeedback.success) {
    res.status(400).json({
      success: false,
      message: "Invalid input",
      errors: validateFeedback.error.flatten().fieldErrors,
    });
    return;
  }

  const {
    siteId,
    title,
    description,
    name,
    userInfo,
    category,
    priority,
    page,
    visitorId,
  } = validateFeedback.data;

  const visitorName = name && name.trim() !== "" ? name.trim() : "Anonymous";

  // Sanitize all user-provided text fields before storing
  const clean = sanitizeFeedback({
    title,
    description,
    name: visitorName,
    userInfo,
  });

  try {
    const feedback = await Feedback.create({
      siteId,
      title: clean.title,
      description: clean.description,
      name: clean.name,
      userInfo: clean.userInfo,
      category,
      priority,
      page,
      visitorId,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
    });
  }
};

// @desc    Get all feedback for an admin
// @route   GET /api/feedback/allFeedbacks
// @access  Private (Admin)
export const getAdminFeedbacks = async (req: Request, res: Response) => {
  try {
    if (!req.admin) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const adminId = req.admin._id;

    // get all sites owned by this admin
    const admin = await Admin.findById(adminId).select("AdminSite");
    const siteIds = admin?.AdminSite.map((s) => s.siteId);

    // get feedbacks for these sites
    const feedbacks = await Feedback.find({ siteId: { $in: siteIds } });

    res.status(200).json({
      success: true,
      data: feedbacks,
      message: "Feedback fetched successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc    Get all feedback for a site (admin)
// @route   GET /api/feedback/:siteId
// @access  Private (Admin)
export const getFeedbackForSite = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const siteId = req.params.siteId;

  try {
    const feedbacks = await Feedback.find({ siteId })
      .sort({ createdAt: -1 })
      .populate("visitorId");
    res.status(200).json({
      success: true,
      data: feedbacks,
      message: "Feedback fetched successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
};

// @desc    Get all feedback by visitorId
// @route   GET /api/feedback/by-visitor/:visitorId
// @access  Private (Admin)
export const getFeedbackByVisitor = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { visitorId } = req.params;

  if (!visitorId) {
    res.status(400).json({ success: false, message: "visitorId is required" });
    return;
  }

  try {
    // Fetch both feedback and visitor sessions in parallel
    const [feedbacks, visitorSessions] = await Promise.all([
      Feedback.find({ visitorId }).sort({ createdAt: -1 }),
      Visitor.find({ visitorId })
        .sort({ visitTimestamp: -1 })
        .select(
          "siteId sessionId visitTimestamp sessionStart page pagesVisited country city region userInfo",
        ),
    ]);

    res.status(200).json({
      success: true,
      data: {
        feedbacks,
        sessions: visitorSessions,
        totalSessions: visitorSessions.length,
        totalFeedback: feedbacks.length,
      },
      message: "Visitor data fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching visitor data:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    if (!req.admin) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const { siteId } = req.params;

    // Build the siteId filter correctly
    let siteIds: string[];
    if (siteId) {
      siteIds = [siteId];
    } else {
      siteIds = req.admin.AdminSite.map((s) => s.siteId);
    }

    if (siteIds.length === 0) {
      res.json({
        success: true,
        data: { labels: [], trend: [0, 0, 0, 0, 0], positive: 0, negative: 0 },
      });
      return;
    }
    // Build last 5 month labels on the JS side (cheap, no DB needed)
    const now = new Date();
    const labels: string[] = [];
    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i);
      labels.push(d.toLocaleString("default", { month: "short" }));
    }

    // Single aggregation query does everything in the database
    const fiveMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 4, 1);

    const [trendResult, sentimentResult] = await Promise.all([
      // Trend: count feedbacks grouped by month for the last 5 months
      Feedback.aggregate([
        {
          $match: {
            siteId: { $in: siteIds },
            createdAt: { $gte: fiveMonthsAgo },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
              month: { $month: "$createdAt" },
            },
            count: { $sum: 1 },
          },
        },
      ]),

      // Sentiment: count positive and negative in one pass
      Feedback.aggregate([
        {
          $match: { siteId: { $in: siteIds } },
        },
        {
          $group: {
            _id: null,
            positive: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      {
                        $in: ["$category", ["feature", "improvement", "other"]],
                      },
                      { $in: ["$priority", ["medium", "low"]] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            negative: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $eq: ["$category", "bug"] },
                      { $in: ["$priority", ["critical", "high"]] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
          },
        },
      ]),
    ]);

    // Map aggregation results back into the 5-slot trend array
    const trend = [0, 0, 0, 0, 0];
    trendResult.forEach(({ _id, count }) => {
      const monthDiff =
        (now.getFullYear() - _id.year) * 12 + (now.getMonth() + 1 - _id.month);
      if (monthDiff >= 0 && monthDiff < 5) {
        trend[4 - monthDiff] = count;
      }
    });

    const positive = sentimentResult[0]?.positive ?? 0;
    const negative = sentimentResult[0]?.negative ?? 0;

    res.json({ success: true, data: { labels, trend, positive, negative } });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
