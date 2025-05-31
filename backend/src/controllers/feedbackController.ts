import { Request, Response } from "express";
import Feedback from "../models/feedbackModels";

// @desc    Submit feedback (public)
// @route   POST /api/feedback
// @access  Public
export const submitFeedback = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId, title, description, name, userInfo, type } = req.body;

  const feedbackName = name && name.trim() !== "" ? name.trim() : "Anonymous";

  try {
    const feedback = await Feedback.create({
      siteId,
      title,
      description,
      name: feedbackName,
      userInfo,
      type,
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
// @access  Private
export const getFeedbackForSite = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { siteId } = req.params;

  try {
    const feedbacks = await Feedback.find({ siteId }).sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (error) {
    console.error("Fetching feedback error:", error);
    res.status(500).json({ message: "Failed to fetch feedback" });
  }
};
