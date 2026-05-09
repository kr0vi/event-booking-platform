import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { createEventSchema, updateEventSchema } from "../schemas/events.js";

export const getAllEvents = async (req: Request, res: Response) => {
  const pageNumber = Math.min(parseInt(req.query.page as string) || 1, 100); // Limit to 100 pages to prevent abuse
  const pageSize = 6; // Number of events per page
  const skip = (pageNumber - 1) * pageSize;
  const allEvents = await prisma.event.findMany({
    where: {
      isDeleted: false,
      status: "PUBLISHED",
    },
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
  const foundEvent = await prisma.event.findFirst({
    where: {
      id: eventId,
      isDeleted: false,
      status: "PUBLISHED",
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

export const updateEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  if (!eventId || Array.isArray(eventId)) {
    return res.json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  }
  const hostId = (req as any).userId;

  const { success, data , error } = updateEventSchema.safeParse(req.body);
  if (!success) {
    const message = error.issues[0]?.message ?? "Invalid input";
    return res.json({
      success: false,
      data: null,
      message,
    });
  }
  let validData = data;

  const findEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
      hostId: hostId,
    },
  });
  if (!findEvent) {
    return res.json({
      success: false,
      data: null,
      message: "Event not found or you are not the host",
    });
  }
  if (
    findEvent.status === "CANCELLED" ||
    findEvent.status === "COMPLETED" ||
    findEvent.isDeleted
  ) {
    return res.json({
      success: false,
      data: null,
      message:
        "Cannot update a cancelled or completed event or an event that is deleted",
    });
  }
  const updatedEventData = {
    ...(data.title !== undefined ? { title: data.title } : {}),
    ...(data.description !== undefined ? { description: data.description } : {}),
    ...(data.location !== undefined ? { location: data.location } : {}),
    ...(data.eventDate !== undefined ? { date: data.eventDate } : {}),
    ...(data.eventTime !== undefined ? { time: data.eventTime } : {}),
    ...(data.posterImage !== undefined ? { posterImage: data.posterImage } : {}),
    ...(data.highlights !== undefined ? { highlights: data.highlights } : {}),
    ...(data.thingsToKnow !== undefined
      ? { thingsToKnow: data.thingsToKnow }
      : {}),
    ...(data.price !== undefined ? { price: data.price } : {}),
    ...(data.totalTickets !== undefined
      ? { totalTickets: data.totalTickets }
      : {}),
    ...(data.ticketPerStudent !== undefined
      ? { ticketPerStudent: data.ticketPerStudent }
      : {}),
  };
  const updatedEvent = await prisma.event.update({
    where: {
      id: eventId,
      hostId,
    },
     data: updatedEventData,
  });
  res.json({
    success: true,
    data: updatedEvent,
    message: "Event updated successfully",
  });
};

export const cancelEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  if (!eventId || Array.isArray(eventId)) {
    return res.json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  } 
  const hostId = (req as any).userId;
  const findEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
      hostId: hostId,
    },
  });
  if (!findEvent) {
    return res.json({
      success: false,
      data: null,
      message: "Event not found or you are not the host",
    });
  }
  if (findEvent.isDeleted) {
    return res.json({
      success: false,
      data: null,
      message: "Cannot cancel a deleted event",
    });
  }
  if (findEvent.status === "CANCELLED" || findEvent.status === "COMPLETED") {
    return res.json({
      success: false,
      data: null,
      message: "Event is already cancelled or completed",
    });
  }
  const cancelledEvent = await prisma.event.update({
    where: {
      id: eventId,
      hostId,
    },
    data: {
      status: "CANCELLED",
    },
  });
  res.json({
    success: true,
    data: cancelledEvent,
    message: "Event cancelled successfully",
  });
};

export const deleteEvent = async (req: Request, res: Response) => {
  const eventId = req.params.id;
  if (!eventId || Array.isArray(eventId)) {
    return res.json({
      success: false,
      data: null,
      message: "Event ID is required",
    });
  }
  const hostId = (req as any).userId;
  const findEvent = await prisma.event.findUnique({
    where: {
      id: eventId,
      hostId: hostId,
    },
  });
  if (!findEvent) {
    return res.json({
      success: false,
      data: null,
      message: "Event not found or you are not the host",
    });
  }
  if (findEvent.isDeleted) {
    return res.json({
      success: false,
      data: null,
      message: "Cannot delete an already deleted event",
    });
  }
  if (findEvent.status === "COMPLETED") {
    return res.json({
      success: false,
      data: null,
      message: "Cannot delete a completed event",
    });
  }
  await prisma.event.update({
    where: {
      id: eventId,
      hostId,
    },
    data: {
      isDeleted: true,
      deletedAt: new Date(),
    },
  });
  res.json({
    success: true,
    message: "Event deleted successfully",
  });
};