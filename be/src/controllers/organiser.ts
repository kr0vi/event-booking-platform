import type { Request, Response } from "express";
import { prisma } from "../index.js";

export const getOrganizerEvents = async (req: Request, res: Response) => {
  //@ts-ignore
  const orgId = req.userId;
  const events = await prisma.event.findMany({
    where: {
      organizerId: orgId,
    },
  });
  return res.json({ success: true, data: events || [] });
};
