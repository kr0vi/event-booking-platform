import { Router } from "express";
import { createOrder } from "../controllers/orders.js";
import { authMiddleware } from "../middleware/user.js";


const orderRouter = Router();


orderRouter.post("/",authMiddleware,createOrder);

export default orderRouter;