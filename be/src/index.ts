import express from "express";
import rootRouter from "./routes/index.js";
import { PORT } from "./secrets.js";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", rootRouter);

export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});