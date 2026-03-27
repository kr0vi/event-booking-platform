import { Router } from "express";
import { createEvents, getAllEvents, getEventById } from "../controllers/events.js";


const eventsRouter = Router();

eventsRouter.get("/",getAllEvents);
eventsRouter.get("/:id",getEventById);
eventsRouter.post("/",createEvents);

export default eventsRouter;