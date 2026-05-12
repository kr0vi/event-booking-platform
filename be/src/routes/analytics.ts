import { Router } from "express";
import { hostMiddleware } from "../middleware/user.js";
import { getHostEventAnalytics } from "../controllers/analytics.js";

const analyticsRouter = Router();

analyticsRouter.get("/:eventId/analytics", hostMiddleware, getHostEventAnalytics);

export default analyticsRouter;