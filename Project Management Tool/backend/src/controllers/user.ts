import { Request, Response } from "express";

const checkUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  return res.json({ ok: true, user: req.user });
};

const register = (req: Request, res: Response) => {
  res.json({ ok: true, message: "User registered successfully" });
};

const login = async (req: Request, res: Response) => {

    

   
};

const userController = {
  checkUser,
  register,
  login,
};
export default userController;
