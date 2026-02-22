import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const checkUser = (req: Request, res: Response) => {
  res.json({ ok: true, user: req.user as JwtPayload });
};

const register = (req: Request, res: Response) => {
  res.json({ ok: true, message: "User registered successfully" });
}

const login = (req: Request, res: Response) => {
  res.json({ ok: true, message: "User logged in successfully" });
}


const userController = {
  checkUser,
  register,
  login
};
export default userController;
