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
