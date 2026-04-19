import { Router } from "express";
import { organizerMiddleware } from "../middleware/user.js";
import { getOrganizerEvents } from "../controllers/organiser.js";


const organiserRouter = Router();

organiserRouter.get("/events", organizerMiddleware, getOrganizerEvents);

export default organiserRouter;