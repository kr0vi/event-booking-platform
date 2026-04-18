import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { ADMIN_MAILS, JWT_SECRET_KEY } from "../secrets.js";
import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { loginSchema, signupSchema } from "../schemas/auht.js";

export const signup = async (req: Request, res: Response) => {
  const { success, data } = signupSchema.safeParse(req.body);
  if (!success) {
    res.json({
      success: false,
      data: null,
      message: "Invalid input",
    });
    return;
  }
  const { email, password, name } = data;

  let user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (user) {
    res.json({
      success: false,
      data: null,
      message: "User already exists",
    });
  }
  if (ADMIN_MAILS.includes(email)) {
    user = await prisma.user.create({
      data: {
        name,
        role: "ADMIN",
        email,
        passwordHash: hashSync(password, 10),
      },
    });
  } else {
    user = await prisma.user.create({
      data: {
        name,
        role: "USER",
        email,
        passwordHash: hashSync(password, 10),
      },
    });
  }
  res.json({ success: true, message: "User created successfully", data: user });
};

export const login = async (req: Request, res: Response) => {
  const { success, data } = loginSchema.safeParse(req.body);
  if (!success) {
    res.json({
      success: false,
      data: null,
      message: "Invalid input",
    });
    return;
  }
  const { email, password } = data;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (!user) {
    res.json({
      success: false,
      data: null,
      message: "User does not exist",
    });
  }

  const isPasswordValid = compareSync(password, user?.passwordHash!);
  if (!isPasswordValid) {
    res.json({
      success: false,
      data: null,
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
    success: true,
    message: "Login successful",
    token,
  });
};

export const me = async (req: Request, res: Response) => {
  //@ts-ignore
  const userId = req.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
      email: true,
      name: true,
    },
  });
  res.json({
    success: true,
    user: user,
    message: "User fetched successfully",
  });
};
