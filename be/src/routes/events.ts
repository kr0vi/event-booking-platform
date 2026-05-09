import { Router } from "express";
import { createEvents, getAllEvents, getEventById, getUserEvents } from "../controllers/events.js";
import { authMiddleware, hostMiddleware } from "../middleware/user.js";


const eventsRouter = Router();

eventsRouter.get("/",getAllEvents);
eventsRouter.get("/my-events",authMiddleware,getUserEvents)
eventsRouter.get("/:id",getEventById);
eventsRouter.post("/",hostMiddleware,createEvents);

export default eventsRouter;