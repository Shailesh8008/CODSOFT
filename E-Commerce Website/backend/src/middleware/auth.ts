import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { MyJwtPayload } from "../interfaces";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.json({ ok: false, message: "Access Denied: No token provided" });
  }

  try {
    const verify = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!,
    ) as MyJwtPayload;
    req.user = verify;
  } catch (error) {
    return res.json({ ok: false, message: "Token is invalid or expired" });
  }

  next();
};

export const adminAuth = (req: Request, res: Response, next: NextFunction) => {
  const { role } = req.user!;
  if (role === "admin") return next();
  return res.json({ ok: false, message: "Only Admin can access this page" });
};
