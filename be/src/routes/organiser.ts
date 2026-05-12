import { Router } from "express";
import { hostMiddleware } from "../middleware/user.js";
import { getHostEvents,getHostEventById } from "../controllers/organiser.js";
import analyticsRouter from "./analytics.js";

const organiserRouter = Router();

organiserRouter.get("/events", hostMiddleware, getHostEvents);
organiserRouter.get("/events/:eventId", hostMiddleware, getHostEventById);
organiserRouter.use("/events", analyticsRouter);

export default organiserRouter;
