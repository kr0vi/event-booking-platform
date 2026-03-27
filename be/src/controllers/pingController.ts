import type { Request, Response } from "express";
import { prisma } from "../index.js";

export const pingController = async (req: Request, res: Response) => {
  await prisma.user.create({
    data: {
      name: "John Doe",
      email: "john@doe@gmail.com",
      passwordHash: "hashedpassword",
    },
  });
  res.send("Pong!");
};
