import { Response } from "express";
import jwt from "jsonwebtoken";
import { isProduction } from "./utils.js";

export const COOKIE_OPTS = {
  httpOnly: true,
  secure: isProduction,
  sameSite: (isProduction ? "none" : "lax") as "none" | "lax",
};

export function generateTokens(adminId: string, refreshVersion: number) {
  const accessToken = jwt.sign(
    { id: adminId },
    process.env.JWT_SECRET!,
    { expiresIn: "15m" }, // short-lived — was 24h, now 15 minutes
  );

  const refreshToken = jwt.sign(
    { id: adminId, version: refreshVersion },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );

  return { accessToken, refreshToken };
}

export function setTokenCookies(
  res: Response,
  accessToken: string,
  refreshToken: string,
) {
  res.cookie("accessToken", accessToken, {
    ...COOKIE_OPTS,
    maxAge: 15 * 60 * 1000, // 15 min
  });
  res.cookie("refreshToken", refreshToken, {
    ...COOKIE_OPTS,
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
}

export function clearTokenCookies(res: Response) {
  res.clearCookie("accessToken", COOKIE_OPTS);
  res.clearCookie("refreshToken", COOKIE_OPTS);
}
