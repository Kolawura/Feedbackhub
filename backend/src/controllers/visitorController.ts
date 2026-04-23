import { Request, Response } from "express";
import Visitor from "../models/visitorModels.js";
import { visitorSchema } from "../schema/visitorSchema.js";

// @desc    Track visitor with geolocation
// @route   POST /api/visitor/track
// @access  Public
export const trackVisitor = async (
  req: Request,
  res: Response,
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
    const visitorData = await Visitor.create(validateVisitor.data);
    res.status(201).json({
      success: true,
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
  res: Response,
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
  res: Response,
): Promise<void> => {
  if (!req.admin) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }

  const { siteId } = req.params;
  const { range } = req.query;

  try {
    const siteIds = siteId
      ? [siteId]
      : req.admin.AdminSite.map((s) => s.siteId);

    if (siteIds.length === 0) {
      res.status(200).json({
        success: true,
        data: { labels: [], data: [], label: range ?? "30days" },
      });
      return;
    }

    const now = new Date();
    let startDate = new Date();
    let groupFormat: string;

    // Build the complete expected slots for this range
    // Each slot: { key: string used in aggregation, label: string shown in chart }
    const slots: { key: string; label: string }[] = [];

    switch (range) {
      case "24hours": {
        startDate = new Date(now);
        startDate.setHours(now.getHours() - 23, 0, 0, 0);
        groupFormat = "%Y-%m-%dT%H";
        for (let i = 23; i >= 0; i--) {
          const d = new Date(now);
          d.setHours(now.getHours() - i, 0, 0, 0);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}T${String(d.getHours()).padStart(2, "0")}`;
          slots.push({
            key,
            label: `${String(d.getHours()).padStart(2, "0")}:00`,
          });
        }
        break;
      }
      case "7days": {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 6);
        startDate.setHours(0, 0, 0, 0);
        groupFormat = "%Y-%m-%d";
        for (let i = 6; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          const label = d.toLocaleString("default", {
            weekday: "short",
            month: "short",
            day: "numeric",
          });
          slots.push({ key, label });
        }
        break;
      }
      case "4weeks": {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 27);
        startDate.setHours(0, 0, 0, 0);
        groupFormat = "%G-W%V";

        // Get the ISO week key for any date — must match exactly what MongoDB produces
        const getISOWeekKey = (date: Date): string => {
          const d = new Date(date);
          d.setHours(0, 0, 0, 0);
          // Set to nearest Thursday (ISO week ownership rule)
          d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
          const yearStart = new Date(d.getFullYear(), 0, 4); // Jan 4 is always in week 1
          const weekNum =
            Math.round(
              ((d.getTime() - yearStart.getTime()) / 86400000 +
                ((yearStart.getDay() + 6) % 7)) /
                7,
            ) + 1;
          return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
        };

        const seenKeys = new Set<string>();
        // Walk day by day across the 28-day window, deduplicate by week key
        for (let i = 27; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const key = getISOWeekKey(d);

          if (seenKeys.has(key)) continue;
          seenKeys.add(key);

          // Label: show the Monday of that week → Sunday
          const dayOfWeek = (d.getDay() + 6) % 7; // 0 = Monday
          const monday = new Date(d);
          monday.setDate(d.getDate() - dayOfWeek);
          const sunday = new Date(monday);
          sunday.setDate(monday.getDate() + 6);

          const label = `${monday.toLocaleString("default", { month: "short", day: "numeric" })} – ${sunday.toLocaleString("default", { month: "short", day: "numeric" })}`;
          slots.push({ key, label });
        }
        break;
      }
      case "12months": {
        startDate = new Date(now);
        startDate.setFullYear(now.getFullYear() - 1);
        startDate.setDate(1);
        startDate.setHours(0, 0, 0, 0);
        groupFormat = "%Y-%m";
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
          const label = d.toLocaleString("default", {
            month: "short",
            year: "2-digit",
          });
          slots.push({ key, label });
        }
        break;
      }
      case "30days":
      default: {
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 29);
        startDate.setHours(0, 0, 0, 0);
        groupFormat = "%Y-%m-%d";
        for (let i = 29; i >= 0; i--) {
          const d = new Date(now);
          d.setDate(now.getDate() - i);
          const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
          const label = d.toLocaleString("default", {
            month: "short",
            day: "numeric",
          });
          slots.push({ key, label });
        }
        break;
      }
    }

    // Aggregate — only returns slots that have visits
    const visitors = await Visitor.aggregate([
      {
        $match: {
          siteId: { $in: siteIds },
          visitTimestamp: { $gte: startDate },
        },
      },
      {
        $group: {
          _id: {
            $dateToString: { format: groupFormat, date: "$visitTimestamp" },
          },
          count: { $sum: 1 },
        },
      },
    ]);

    // Build a lookup map from aggregation results: key → count
    const countMap = new Map<string, number>();
    visitors.forEach((v) => countMap.set(v._id, v.count));

    // Merge — fill every slot, defaulting to 0 where no visits occurred
    const labels = slots.map((s) => s.label);
    const data = slots.map((s) => countMap.get(s.key) ?? 0);

    res.status(200).json({
      success: true,
      data: { labels, data, label: range ?? "30days" },
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch analytics" });
  }
};
