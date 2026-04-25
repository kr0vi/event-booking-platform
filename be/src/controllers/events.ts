import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { createEventSchema } from "../schemas/events.js";

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
    include: {
      organizer: {
        select: {
          name: true,
        },
      },
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

export const createEvents = async (req: Request, res: Response) => {
  const organizerId = (req as any).userId;
  const { success, data, error } = createEventSchema.safeParse(req.body);
  if (!success) {
    return res.json({
      success: false,
      data: null,
      message: error.message,
    });
  }
  try {
    await prisma.event.create({
      data: {
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.eventDate,
        time: data.eventTime,
        posterImage: data.posterImage,
        galleryImages: data.galleryImages,
        highlights: data.highlights,
        thingsToKnow: data.thingsToKnow,
        price: data.price,
        totalTickets: data.totalTickets,
        organizerId,
      },
    });
    res.json({
      success: true,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.json({
      success: false,
      data: null,
      message: "Failed to create event",
    });
  }
};

export const getUserEvents = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const events = await prisma.ticket.findMany({
    where: {
      userId: userId,
    },
    select: {
      event: {
        select:{
          date: true,
          time: true,
          title:true,
          location:true,
          price:true,
          posterImage:true,
        }
      },
    },
  });
  if (events.length === 0) {
    return res.json({
      success: false,
      data: [],
      message: "No events found for the user",
    });
  }
  res.json({
    success: true,
    data: events,
    message: "User events fetched successfully",
  });
};
