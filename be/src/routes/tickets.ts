import { Router } from "express";
import {
  getAllTickets,
  getTicketById,
  validateTicket,
} from "../controllers/tickets.js";
import { hostMiddleware, authMiddleware } from "../middleware/user.js";

const ticketsRouter = Router();

ticketsRouter.post("/validate", hostMiddleware, validateTicket); // only hosts can validate tickets
ticketsRouter.get("/", authMiddleware, getAllTickets);
ticketsRouter.get("/:id", authMiddleware, getTicketById);

export default ticketsRouter;
