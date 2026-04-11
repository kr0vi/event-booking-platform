import { Router } from "express";
import { login, me, signup } from "../controllers/auth.js";
import { authMiddleware } from "../middleware/user.js";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/login", login);
authRouter.get("/me", authMiddleware, me);

export default authRouter;
