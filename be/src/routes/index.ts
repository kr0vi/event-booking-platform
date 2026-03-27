import { Router } from "express";
import { pingController } from "../controllers/pingController.js";



const rootRouter = Router();

rootRouter.get("/",pingController);


export default rootRouter;