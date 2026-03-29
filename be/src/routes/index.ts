import { Router } from "express";
import { pingController } from "../controllers/pingController.js";
import eventsRouter from "./events.js";
import authRouter from "./auth.js";
import orderRouter from "./order.js";
import ticketsRouter from "./tickets.js";



const rootRouter = Router();

rootRouter.get("/",pingController);
rootRouter.use("/events",eventsRouter)
rootRouter.use("/auth",authRouter)
rootRouter.use("/orders",orderRouter)
rootRouter.use("/tickets",ticketsRouter)

export default rootRouter;