import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../lib/prisma";

const checkUser = (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  return res.json({ ok: true, user: req.user });
};

const register = async (req: Request, res: Response) => {
  const { name, email, pass1 } = req.body as {
    name?: string;
    email?: string;
    pass1?: string;
  };

  if (!name || !email || !pass1) {
    return res.status(400).json({
      ok: false,
      message: "name, email, and pass1 are required",
    });
  }

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res
        .status(409)
        .json({ ok: false, message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(pass1, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return res
      .status(201)
      .json({ ok: true, message: "User registered successfully" });
  } catch (error) {
    return res
      .status(500)
      .json({ ok: false, message: "Failed to register user" });
  }
};

const login = async (req: Request, res: Response) => {};

const userController = {
  checkUser,
  register,
  login,
};
export default userController;
