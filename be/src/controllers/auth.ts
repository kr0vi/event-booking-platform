import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { JWT_SECRET_KEY } from "../secrets.js";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";

export const signup = async (req: Request, res: Response) => {
  const {
    email,
    password,
    name,
  }: { email: string; password: string; name: string } = req.body;

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    res.json({
      success: false,
      message: "User already exists",
    });
  }

  user = await prisma.user.create({
    data: {
      name,
      role: "ORGANIZER",
      email,
      passwordHash: hashSync(password, 10),
    },
  });
  res.json({ success: true, message: "User created successfully", data: user });
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    res.json({
      success: false,
      message: "User does not exist",
    });
  }

  const isPasswordValid = compareSync(password, user?.passwordHash!);
  if (!isPasswordValid) {
    res.json({
      success: false,
      message: "Invalid password",
    });
  }
  const token = jwt.sign(
    {
      //@ts-ignore
      id: user.id,
    },
    JWT_SECRET_KEY,
  );
  res.json({
    user,
    success: true,
    message: "Login successful",
    token,
  });
};
