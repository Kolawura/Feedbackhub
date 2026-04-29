import { Request, Response } from "express";
import Admin from "../models/adminModels.js";
import { nanoid } from "nanoid";
import Site from "../models/siteModels.js";
import Feedback from "../models/feedbackModels.js";

// ─── Existing: add new site ───────────────────────────────────────────────────
export const addNewSite = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const adminId = req.admin?._id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    const siteId = `site_${nanoid(10)}`;
    const newSite = {
      siteId,
      name: req.body.name || `Site ${admin.AdminSite.length + 1}`,
    };
    const site = await Site.create(newSite);
    admin.AdminSite.push({ siteId: site.siteId, name: site.name });
    await admin.save();

    res.status(200).json({
      success: true,
      message: "New site added successfully",
      newSite,
      sites: admin.AdminSite,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Existing: get all site IDs ───────────────────────────────────────────────
export const getSiteIds = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const adminId = req.admin?._id;
    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }
    res.status(200).json({ success: true, sites: admin.AdminSite });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── Existing: validate site ID (public — used by widget) ────────────────────
export const validateSiteId = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { siteId } = req.params;

    // Return the widgetConfig so the widget can apply it
    const site = await Site.findOne({ siteId }).select("siteId widgetConfig");
    if (!site) {
      res.status(404).json({
        success: false,
        message: "Site not found",
        errors: { siteId: "Invalid site ID" },
      });
      return;
    }
    res.status(200).json({
      success: true,
      message: "Site ID is valid",
      widgetConfig: site.widgetConfig,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── New: rename a site ────────────────────────────────────────────────────────
export const renameSite = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { siteId } = req.params;
    const { name } = req.body;
    const adminId = req.admin?._id;

    if (!name?.trim()) {
      res.status(400).json({ success: false, message: "Name is required" });
      return;
    }

    // Update in the Site collection
    const site = await Site.findOneAndUpdate(
      { siteId },
      { name: name.trim() },
      { new: true },
    );
    if (!site) {
      res.status(404).json({ success: false, message: "Site not found" });
      return;
    }

    // Also update the denormalised name in AdminSite array
    await Admin.updateOne(
      { _id: adminId, "AdminSite.siteId": siteId },
      { $set: { "AdminSite.$.name": name.trim() } },
    );

    res.status(200).json({
      success: true,
      message: "Site renamed successfully",
      site,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── New: update widget config for a site ─────────────────────────────────────
export const updateSiteConfig = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { siteId } = req.params;
    const { buttonText, buttonColor, position, theme } = req.body;

    const site = await Site.findOneAndUpdate(
      { siteId },
      {
        $set: {
          "widgetConfig.buttonText": buttonText,
          "widgetConfig.buttonColor": buttonColor,
          "widgetConfig.position": position,
          "widgetConfig.theme": theme,
        },
      },
      { new: true, runValidators: true },
    );

    if (!site) {
      res.status(404).json({ success: false, message: "Site not found" });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Widget config updated",
      widgetConfig: site.widgetConfig,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ─── New: delete a site ───────────────────────────────────────────────────────
export const deleteSite = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { siteId } = req.params;
    const adminId = req.admin?._id;

    // Delete the site document
    const site = await Site.findOneAndDelete({ siteId });
    if (!site) {
      res.status(404).json({ success: false, message: "Site not found" });
      return;
    }

    // Remove from admin's AdminSite array
    await Admin.updateOne(
      { _id: adminId },
      { $pull: { AdminSite: { siteId } } },
    );

    // Delete all feedback associated with this site
    await Feedback.deleteMany({ siteId });

    res.status(200).json({
      success: true,
      message: "Site and all associated feedback deleted",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
