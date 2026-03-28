import type { Request, Response } from "express";
import { prisma } from "../index.js";
import { createRazorpay } from "../lib/createRazorpay.js";

export const createPayment = async (req: Request, res: Response) => {
  const orderId = req.body.orderId;
  if (!orderId) {
    return res.json({
      success: false,
      data: null,
      message: "Order ID is required",
    });
  }
  const order = await prisma.order.findUnique({
    where: {
      id: orderId,
      userId: (req as any).userId,
    },
  });
  if (!order) {
    return res.json({
      success: false,
      data: null,
      message: "Order not found",
    });
  }
  if (order.paymentStatus !== "PENDING") {
    return res.json({
      success: false,
      data: null,
      message: "Order is not pending payment",
    });
  }
  // Create Razorpay order and return the order details to the client
  const options = {
    amount: order.totalAmount * 100, // amount in the smallest currency unit
    currency: "INR",
    receipt: `receipt_${order.id}`,
  };

  try {
    const rzp = await createRazorpay();
    rzp.orders.create(options, (err: any, order: any) => {
      if (err) {
        console.error(err);
        return res.json({
          success: false,
          data: null,
          message: "Failed to create payment",
        });
      }
      return res.json({
        success: true,
        data: order,
        message: "Payment created successfully",
      });
    });
  } catch (err) {
    console.error(err);
    return res.json({
      success: false,
      data: null,
      message: "Failed to create payment",
    });
  }
};
