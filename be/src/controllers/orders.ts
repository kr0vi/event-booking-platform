import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { createPayment } from "./payment.js";
import { generateTicket } from "./tickets.js";

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
  const order = await prisma.order.create({
    data: {
      userId,
      eventId,
      quantity,
      totalAmount: totalPrice,
      paymentStatus: "COMPLETED", // For simplicity, we are marking the order as completed. In a real application, this should be "PENDING" until payment is confirmed.
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
  // return res.json({
  //   success: true,
  //   data: order,
  //   message: "Order created successfully",
  // });
  // LATER THIS WILL BE IMPLEMENTED TO CREATE A PAYMENT LINK AND RETURN IT TO THE CLIENT
  // createPayment(req, res, order.id);

  // For now, we will create ticket directly without payment
  const ticket = await generateTicket(order.id, userId, order.eventId);
  if (!ticket) {
    return res.json({
      success: false,
      data: null,
      message: "Failed to generate ticket",
    });
  }
  return res.json({
    success: true,
    data: { order, ticket },
    message: "Order and ticket created successfully",
  });
};
