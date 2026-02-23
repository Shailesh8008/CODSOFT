import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).json({ ok: false, message: "Access denied: no token provided" });
  }

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (typeof verify === "string") {
      return res.status(401).json({ ok: false, message: "Token payload is invalid" });
    }

    req.user = verify;
  } catch (error) {
    return res.status(401).json({ ok: false, message: "Token is invalid or expired" });
  }

  next();
};
