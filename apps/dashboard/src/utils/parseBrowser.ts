export function parseBrowser(ua?: string): string {
  if (!ua) return "Unknown";
  if (ua.includes("Edg")) return "Edge";
  if (ua.includes("Chrome")) return "Chrome";
  if (ua.includes("Firefox")) return "Firefox";
  if (ua.includes("Safari")) return "Safari";
  if (ua.includes("Opera")) return "Opera";
  return "Other";
}
export function parsePlatform(p?: string) {
  if (!p) return "—";
  if (/win/i.test(p)) return "Windows";
  if (/mac/i.test(p)) return "macOS";
  if (/linux/i.test(p)) return "Linux";
  if (/android/i.test(p)) return "Android";
  if (/iphone|ipad|ios/i.test(p)) return "iOS";
  return p;
}
