import sanitizeHtml from "sanitize-html";
import { email } from "zod/v4";

export function sanitizeText(input: string): string {
  return sanitizeHtml(input, {
    allowedTags: [], // no tags allowed at all
    allowedAttributes: {},
  }).trim();
}

// Sanitize a whole feedback object in one call
export function sanitizeFeedback(data: {
  title: string;
  description?: string;
  name?: string;
  userInfo?: {
    browser?: string;
    os?: string;
    ip?: string;
    location?: string;
    email?: string;
  };
}) {
  return {
    ...data,
    title: sanitizeText(data.title),
    description: data.description ? sanitizeText(data.description) : undefined,
    name: data.name ? sanitizeText(data.name) : undefined,
    userInfo: data.userInfo
      ? {
          ...data.userInfo,
          email: data.userInfo.email
            ? email(sanitizeText(data.userInfo.email))
            : undefined,
        }
      : undefined,
  };
}
