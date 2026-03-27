import express from "express";
import rootRouter from "./routes/index.js";
import { PORT } from "./secrets.js";
import { PrismaClient } from "@prisma/client";

const app = express();

app.use("/api/v1", rootRouter);

export const prisma = new PrismaClient();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
