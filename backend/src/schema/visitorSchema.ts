import { z } from "zod";

export const pageVisitSchema = z.object({
  url: z.string().min(1, "URL is required"),
  timestamp: z.coerce.date().optional(),
});

export const visitorSchema = z.object({
  siteId: z.string().min(1, "siteId is required"),
  visitorId: z.string().min(1, "visitorId is required"),
  visitTimestamp: z.coerce.date({
    required_error: "visitTimestamp is required",
  }),
  sessionStart: z.coerce.date({ required_error: "sessionStart is required" }),
  page: z.string().min(1, "page is required"),
  userInfo: z
    .object({
      userAgent: z.string().optional(),
      language: z.string().optional(),
      platform: z.string().optional(),
      screenWidth: z.number().optional(),
      screenHeight: z.number().optional(),
      timezoneOffset: z.number().optional(),
    })
    .optional(),
  country: z.string().default("Unknown"),
  region: z.string().default(""),
  city: z.string().default(""),
  pagesVisited: z.array(pageVisitSchema).default([]),
});
