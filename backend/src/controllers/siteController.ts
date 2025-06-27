import { Request, Response } from "express";
import Admin from "../models/adminModels.js";
import { nanoid } from "nanoid";

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
      createdAt: new Date(),
    };

    admin.AdminSite.push(newSite);
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
