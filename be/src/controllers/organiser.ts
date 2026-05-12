import type { Request, Response } from "express";
import { prisma } from "../index.js";

export const getHostEvents = async (req: Request, res: Response) => {
  //@ts-ignore
  const hostId = req.userId;
  const events = await prisma.event.findMany({
    where: {
      hostId: hostId,
    },
  });
  return res.json({ success: true, data: events || [] });
};

export const getHostEventById = async (req: Request, res: Response) => {
  //@ts-ignore
  const hostId = req.userId;
  const eventId = req.params.eventId;
  if (!eventId || Array.isArray(eventId)) {
    return res.status(400).json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  }

  const event = await prisma.event.findFirst({
    where: {
      id: eventId,
      hostId: hostId,
    },
  });

  if (!event) {
    return res.status(404).json({
      success: false,
      data: null,
      message: "Event not found or you do not have access to this event",
    });
  }

  return res.json({ success: true, data: event });
};
  