import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  validateTicket,
} from "../controllers/tickets.js";
import { adminMiddleware, authMiddleware } from "../middleware/user.js";

const ticketsRouter = Router();

ticketsRouter.post("/validate", adminMiddleware, validateTicket); // only organizers can validate tickets
ticketsRouter.get("/", authMiddleware, getAllTickets);
ticketsRouter.get("/:id", authMiddleware, getTicketById);

export default ticketsRouter;
