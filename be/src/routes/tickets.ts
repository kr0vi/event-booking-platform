import { Router } from "express";
import { validateTicket } from "../controllers/tickets.js";

const ticketsRouter = Router();

ticketsRouter.post("/validate", validateTicket);

export default ticketsRouter;
