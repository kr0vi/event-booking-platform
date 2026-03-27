import type { NextFunction, Request, Response } from "express";
import { JWT_SECRET_KEY } from "../secrets.js";
import { prisma } from "../index.js";
// @ts-ignore
import jwt from "jsonwebtoken";
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
    const userId = jwt.verify(token, JWT_SECRET_KEY);
    // @ts-ignore
    req.userId = userId.id;
    let role = await prisma.user.findUnique({
      where: {
        id: userId.id,
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
    const payload = await jwt.verify(token, JWT_SECRET_KEY);
    // @ts-ignore
    req.userId = payload.id;
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
