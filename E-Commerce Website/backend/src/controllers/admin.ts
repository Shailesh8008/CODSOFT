import { Request, Response } from "express";

const checkAdmin = (req: Request, res: Response) => res.json({ ok: true });


const adminController = {
  checkAdmin,
};
export default adminController;
