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

export const getEventById = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  if (!eventId || Array.isArray(eventId)) {
    return res.json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  }
  const foundEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
    },
  });
  if (!foundEvent) {
    return res.json({
      success: false,
      data: null,
      message: "Event not found",
    });
  }
  res.json({
    success: true,
    data: foundEvent,
    message: "Event fetched successfully",
  });
};

interface inputType {
  title: string;
  description: string;
  location: string;
  price: number;
  eventDate: string;
  eventTime: string;
  totalTickets: number;
}

export const createEvents = async (req: Request, res: Response) => {
  const organizerId = (req as any).id;
  const {
    title,
    description,
    location,
    price,
    eventDate,
    eventTime,
    totalTickets,
  }: inputType = req.body;
  await prisma.event.create({
    data: {
      title,
      description,
      location,
      price,
      date: eventDate,
      totalTickets,
      time: eventTime,
      organizerId
    },
  });
    res.json({
        sucess: true,
        message: "Event created successfully"
    })
};
