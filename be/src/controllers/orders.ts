import type { Request, Response } from "express";
import { prisma } from "../index.js";

export const createOrder = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const { eventId, quantity } = req.body;
  if (!eventId || !quantity) {
    return res.json({
      success: false,
      data: null,
      message: "Event ID and quantity are required",
    });
  }
  // Check if the event exists
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
  // Check if there are enough tickets available
  if (!(foundEvent.totalTickets - foundEvent.ticketsSold >= quantity)) {
    return res.json({
      success: false,
      data: null,
      message: "Not enough tickets available",
    });
  }
  const totalPrice = foundEvent.price * quantity;
  // Create the order
 const order =  await prisma.order.create({
    data: {
      userId,
      eventId,
      quantity,
      totalAmount: totalPrice,
    },
  });
  // Update the tickets sold for the event
  await prisma.event.update({
    where: {
      id: eventId,
    },
    data: {
      ticketsSold: foundEvent.ticketsSold + quantity,
    },
  });
  return res.json({
    success: true,
    data: order,
    message: "Order created successfully",
  });
};
