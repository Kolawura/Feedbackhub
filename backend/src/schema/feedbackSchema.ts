import { z } from "zod";

export const feedbackSchema = z.object({
  siteId: z.string().min(1, "Site ID is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  name: z.string().optional(),
  userInfo: z
    .object({
      browser: z.string().optional(),
      os: z.string().optional(),
      ip: z.string().optional(),
      location: z.string().optional(),
      email: z.string().email().optional(),
    })
    .optional(),
  type: z.enum(["bug", "feature", "other"]).optional(),
  visitorId: z.string().optional(),
});
