import { Request, Response } from "express";
import Admin from "../models/adminModels.js";
import { nanoid } from "nanoid";
import Site from "../models/siteModels.js";

export const addNewSite = async (
  req: Request,
  res: Response
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
    console.error("Error adding site:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getSiteIds = async (req: Request, res: Response) => {
  try {
    const adminId = req.admin?._id;

    const admin = await Admin.findById(adminId);
    if (!admin) {
      res.status(404).json({ success: false, message: "Admin not found" });
      return;
    }

    res.status(200).json({
      success: true,
      sites: admin.AdminSite,
    });
  } catch (error) {
    console.error("Error fetching site IDs:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const validateSiteId = async (req: Request, res: Response) => {
  try {
    const { siteId } = req.params;

    const site = await Site.exists({ siteId });
    if (!site) {
      res.status(404).json({
        success: false,
        message:
          "Site not found, please check the site ID or create a new site",
        errors: { siteId: "Invalid site ID" },
      });
      return;
    }
  } catch (error) {
    console.error("Error validating siteId:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
