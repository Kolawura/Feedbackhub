import { Request, Response } from "express";
import Feedback from "../models/feedbackModels";
import { feedbackSchema } from "../schema/feedbackSchema";

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
      message: "Invalid input",
      errors: validateFeedback.error.flatten().fieldErrors,
    });
    return;
  }

  const { siteId, title, description, name, userInfo, type, visitorId } =
    validateFeedback.data;

  const visitorName = name && name.trim() !== "" ? name.trim() : "Anonymous";

  try {
    const feedback = await Feedback.create({
      siteId,
      title,
      description,
      name: visitorName,
      userInfo,
      type,
      visitorId,
    });

    res
      .status(201)
      .json({ message: "Feedback submitted successfully", feedback });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

// @desc    Get all feedback for a site (admin)
// @route   GET /api/feedback/:siteId
// @access  Private (Admin)
export const getFeedbackForSite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId } = req.params;

  try {
    const feedbacks = await Feedback.find({ siteId })
      .sort({ createdAt: -1 })
      .populate("visitor");
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetching feedback error:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};

// @desc    Get all feedback by visitorId
// @route   GET /api/feedback/by-visitor/:visitorId
// @access  Private (Admin)
export const getFeedbackByVisitor = async (req: Request, res: Response) => {
  const { visitorId } = req.params;

  if (!visitorId) res.status(400).json({ error: "visitorId is required" });

  try {
    const feedbacks = await Feedback.find({ visitorId }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, feedbacks });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};
