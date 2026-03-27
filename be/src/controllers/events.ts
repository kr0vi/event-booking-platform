import type { Request, Response } from "express";
import { prisma } from "../index.js";

export const getAllEvents = async (req: Request, res: Response) => {
  const allEvents = await prisma.event.findMany();
  if (allEvents.length === 0) {
    return res.json({
      success: false,
      data: [],
      message: "No events found",
    });
  }
  res.json({
    success: true,
    data: allEvents,
    message: "All events fetched successfully",
  });
};
    