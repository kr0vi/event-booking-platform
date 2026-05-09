import { Router } from "express";
import { cancelEvent, createEvents, deleteEvent, getAllEvents, getEventById, getUserEvents, updateEvent } from "../controllers/events.js";
import { authMiddleware, hostMiddleware } from "../middleware/user.js";


const eventsRouter = Router();

eventsRouter.get("/",getAllEvents);
eventsRouter.get("/my-events",authMiddleware,getUserEvents)
eventsRouter.get("/:id",getEventById);
eventsRouter.post("/",hostMiddleware,createEvents);
eventsRouter.patch("/:id",hostMiddleware,updateEvent)
eventsRouter.post("/:id/cancel",hostMiddleware,cancelEvent)
eventsRouter.post("/:id/delete",hostMiddleware,deleteEvent)

export default eventsRouter;