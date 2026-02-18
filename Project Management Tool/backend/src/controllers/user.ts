import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";

const checkUser = (req: Request, res: Response) => {
  res.json({ ok: true, user: req.user as JwtPayload });
};


const userController = {
  checkUser,
};
export default userController;
