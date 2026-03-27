import { Router } from "express";
import { createEvents, getAllEvents, getEventById } from "../controllers/events.js";
import { adminMiddleware } from "../middleware/user.js";


const eventsRouter = Router();

eventsRouter.get("/",getAllEvents);
eventsRouter.get("/:id",getEventById);
eventsRouter.post("/",adminMiddleware,createEvents);

export default eventsRouter;