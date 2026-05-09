import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { createEventSchema } from "../schemas/events.js";

export const getAllEvents = async (req: Request, res: Response) => {
  const pageNumber = Math.min(parseInt(req.query.page as string) || 1, 100); // Limit to 100 pages to prevent abuse
  const pageSize = 6; // Number of events per page
  const skip = (pageNumber - 1) * pageSize;
  const allEvents = await prisma.event.findMany({
    orderBy: {
      date: "asc",
    },
    skip,
    take: pageSize,
    include: {
      host: {
        select: {
          name: true,
        },
      },
    },
  });
  if (allEvents.length === 0) {
    return res.json({
      success: false,
      data: [],
      pagination: {
        currentPage: pageNumber,
        pageSize,
        hasNextPage: false,
      },
      message: "No events found",
    });
  }
  res.json({
    success: true,
    data: allEvents,
    message: "All events fetched successfully",
    pagination: {
      currentPage: pageNumber,
      pageSize,
      hasNextPage: allEvents.length === pageSize, // If we fetched a full page, there might be a next page
    },
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
      host: {
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
  const hostId = (req as any).userId;
  const { success, data, error } = createEventSchema.safeParse(req.body);
  if (!success) {
    const message = error.issues[0]?.message ?? "Invalid input";
    return res.json({
      success: false,
      data: null,
      message,
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
        hostId,
        ticketPerStudent: data.ticketPerStudent,
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
        select: {
          id: true,
          date: true,
          time: true,
          title: true,
          location: true,
          price: true,
          posterImage: true,
          host: {
            select: {
              name: true,
            },
          },
        },
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
