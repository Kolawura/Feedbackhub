import { Request, Response } from "express";
import Feedback from "../models/feedbackModels.js";
import { feedbackSchema } from "../schema/feedbackSchema.js";
import Site from "../models/siteModels.js";

// @desc    Submit feedback (public)
// @route   POST /api/feedback
// @access  Public
export const submitFeedback = async (
  req: Request,
  res: Response
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
    visitorId,
  } = validateFeedback.data;

  const visitorName = name && name.trim() !== "" ? name.trim() : "Anonymous";

  try {
    const feedback = await Feedback.create({
      siteId,
      title,
      description,
      name: visitorName,
      userInfo,
      category,
      priority,
      visitorId,
    });

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
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
    console.log(req.admin);
    const adminId = req.admin._id;

    // get all sites owned by this admin
    const sites = await Site.find({ admin: adminId }).select("siteId");
    const siteIds = sites.map((s) => s.siteId);

    // get feedbacks for these sites
    const feedbacks = await Feedback.find({ siteId: { $in: siteIds } });

    res.status(200).json({
      success: true,
      data: feedbacks,
      message: "Feedback fetched successfully",
    });
  } catch (err) {
    console.error("Error fetching admin feedbacks:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// @desc    Get all feedback for a site (admin)
// @route   GET /api/feedback/:siteId
// @access  Private (Admin)
export const getFeedbackForSite = async (
  req: Request,
  res: Response
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
    console.error("Fetching feedback error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch feedback",
    });
  }
};

// @desc    Get all feedback by visitorId
// @route   GET /api/feedback/by-visitor/:visitorId
// @access  Private (Admin)
export const getFeedbackByVisitor = async (req: Request, res: Response) => {
  const { visitorId } = req.params;

  if (!visitorId) {
    res.status(400).json({
      success: false,
      message: "visitorId is required",
      errors: { visitorId: "Visitor ID is required" },
    });
    return;
  }

  try {
    const feedbacks = await Feedback.find({ visitorId }).sort({
      createdAt: -1,
    });
    res.status(200).json({
      success: true,
      data: feedbacks,
      message: "Feedback fetched successfully",
    });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export const getDashboardAnalytics = async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;
    if (!req.user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const filter: any = { admin: req.user._id };
    if (siteId) filter.site = siteId;

    const feedbacks = await Feedback.find(filter);

    // 🔹 Generate last 5 months dynamically
    const now = new Date();
    const labels: string[] = [];
    const trend: number[] = [];

    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthLabel = d.toLocaleString("default", { month: "short" }); // e.g. "Aug"
      labels.push(monthLabel);
      trend.push(0);
    }

    // 🔹 Count feedback per month
    feedbacks.forEach((fb) => {
      if (fb.createdAt) {
        const fbDate = new Date(fb.createdAt);
        const monthDiff =
          (now.getFullYear() - fbDate.getFullYear()) * 12 +
          (now.getMonth() - fbDate.getMonth());

        if (monthDiff >= 0 && monthDiff < 5) {
          const index = 4 - monthDiff; // reverse index to match labels order
          trend[index]++;
        }
      }
    });

    // 🔹 Positive vs Negative
    const positive = feedbacks.filter(
      (fb) =>
        (fb.category === "feature" ||
          fb.category === "improvement" ||
          fb.category === "other") &&
        (fb.priority === "medium" || fb.priority === "low")
    ).length;

    const negative = feedbacks.filter(
      (fb) =>
        fb.category === "bug" &&
        (fb.priority === "critical" || fb.priority === "high")
    ).length;

    res.json({ labels, trend, positive, negative });
  } catch (err) {
    console.error("Analytics error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
