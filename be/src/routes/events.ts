import { Router } from "express";
import { createEvents, getAllEvents, getEventById } from "../controllers/events.js";
import { organizerMiddleware } from "../middleware/user.js";


const eventsRouter = Router();

eventsRouter.get("/",getAllEvents);
eventsRouter.get("/:id",getEventById);
eventsRouter.post("/",organizerMiddleware,createEvents);

export default eventsRouter;