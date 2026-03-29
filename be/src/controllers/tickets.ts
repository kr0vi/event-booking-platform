import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../secrets.js";
import QRCode from "qrcode";
import { prisma } from "../index.js";
import type { Request, Response } from "express";

export const generateTicket = async (
  orderId: string,
  userId: number,
  eventId: string,
) => {
  try {
    // already checked that order exists and is completed before calling this function
    const qrToken = jwt.sign({ orderId, userId, eventId }, JWT_SECRET_KEY);
    const qrImage = await QRCode.toDataURL(qrToken);

    const genTicket = await prisma.ticket.create({
      data: {
        orderId,
        userId,
        eventId,
        status: "VALID",
        qrToken,
        qrImage,
      },
    });
    return genTicket;
  } catch (error) {
    console.error("Error generating ticket:", error);
    return null;
  }
};

export const validateTicket = async (req: Request, res: Response) => {
  const qrToken = req.query.code;
  if (!qrToken || typeof qrToken !== "string") {
    return res.json({
      success: false,
      data: null,
      message: "QR token is required",
    });
  }
  try {
    const decoded = jwt.verify(qrToken, JWT_SECRET_KEY) as {
      orderId: string;
      userId: number;
      eventId: string;
    };
    const ticket = await prisma.ticket.findUnique({
      where: {
        qrToken,
        orderId: decoded.orderId,
        userId: decoded.userId,
      },
      select: {
        status: true,
        id: true,
        event: true,
        order: {
          select: {
            quantity: true,
          },
        },
        user: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!ticket) {
      return res.json({
        success: false,
        data: null,
        message: "Ticket not found",
      });
    }
    if (ticket.status !== "VALID") {
      return res.json({
        success: false,
        data: null,
        message: "Ticket is not valid",
      });
    }
    // Mark the ticket as used
    await prisma.ticket.update({
      where: {
        id: ticket.id,
      },
      data: {
        status: "USED",
      },
    });
    return res.json({
      success: true,
      data: {
        eventName: ticket.event.title,
        quantity: ticket.order.quantity,
        user: ticket.user.name,
      },
      message: "Ticket validated successfully",
    });
  } catch (error) {
    console.error("Error validating ticket:", error);
    return res.json({
      success: false,
      data: null,
      message: "Invalid QR token",
    });
  }
};

export const getAllTickets = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const tickets = await prisma.ticket.findMany({
    where: {
      userId,
    },
  });
  return res.json({
    success: true,
    data: tickets,
    message: "Tickets retrieved successfully",
  });
};
export const getTicketById = async (req: Request, res: Response) => {
  const userId = (req as any).userId;
  const ticketId = req.params.id as string;
  const ticket = await prisma.ticket.findFirst({
    where: {
      id: ticketId,
      userId,
    },
  });
  if (!ticket) {
    return res.json({
      success: false,
      data: null,
      message: "Ticket not found",
    });
  }
  return res.json({
    success: true,
    data: ticket,
    message: "Ticket retrieved successfully",
  });
};
