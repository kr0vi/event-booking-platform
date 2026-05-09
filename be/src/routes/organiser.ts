import { Router } from "express";
import { hostMiddleware } from "../middleware/user.js";
import { getHostEvents } from "../controllers/organiser.js";


const organiserRouter = Router();

organiserRouter.get("/events", hostMiddleware, getHostEvents);

export default organiserRouter;