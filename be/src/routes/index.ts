import { Router } from "express";
import { pingController } from "../controllers/pingController.js";
import eventsRouter from "./events.js";



const rootRouter = Router();

rootRouter.get("/",pingController);
rootRouter.use("/events",eventsRouter)


export default rootRouter;