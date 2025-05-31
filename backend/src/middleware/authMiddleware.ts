import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import Admin from "../models/adminModels";
import { AdminDocument } from "../Type/Type";

declare module "express-serve-static-core" {
  interface Request {
    admin?: AdminDocument | null;
  }
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  let token: string | undefined;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return;
      }
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
      }

      const decoded = jwt.verify(token, secret) as JwtPayload;

      const admin = (await Admin.findById(decoded.id).select(
        "-password"
      )) as AdminDocument;
      req.admin = admin;

      if (!req.admin) {
        res.status(401).json({ message: "Unauthorized: Admin not found" });
        return;
      }

      next();
    } catch (error) {
      console.error("Auth middleware error:", error);
      res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
  } else {
    res.status(401).json({ message: "Unauthorized: No token provided" });
  }
};
