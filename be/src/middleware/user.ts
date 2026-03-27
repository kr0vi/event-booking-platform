import { verifyToken } from "@clerk/backend";
import type { NextFunction, Request, Response } from "express";
import { CLERK_SECRET_KEY } from "../secrets.js";
import { prisma } from "../index.js";

export const adminMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || Array.isArray(authHeader)) {
      return res.json({
        success: false,
        data: null,
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        data: null,
        message: "Unauthorized",
      });
    }
    const payload = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
    });
    // @ts-ignore
    req.clerkId = payload.sub;

    let role = await prisma.user.findUnique({
      where: {
        clerkId: payload.sub,
      },
    });
    if (role?.role !== "ADMIN") {
      return res.json({
        success: false,
        data: null,
        message: "Unauthorized",
      });
    }
    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.json({
      success: false,
      data: null,
      message: "Unauthorized",
    });
  }
};
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || Array.isArray(authHeader)) {
      return res.json({
        success: false,
        data: null,
        message: "Unauthorized",
      });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.json({
        success: false,
        data: null,
        message: "Unauthorized",
      });
    }
    const payload = await verifyToken(token, {
      secretKey: CLERK_SECRET_KEY,
    });
    // @ts-ignore
    req.clerkId = payload.sub;
    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.json({
      success: false,
      data: null,
      message: "Unauthorized",
    });
  }
};
