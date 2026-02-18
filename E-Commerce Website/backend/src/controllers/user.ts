import { Request, Response } from "express";
import { MyJwtPayload } from "../interfaces";
const checkUser = (req: Request, res: Response) => {
  res.json({ ok: true, user: req.user as MyJwtPayload });
};

const userController = {
  checkUser,
};
export default userController;
