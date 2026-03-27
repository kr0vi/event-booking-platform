import express from "express";
import rootRouter from "./routes/index.js";
import { PORT } from "./secrets.js";

const app = express();

app.use("/api/v1", rootRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
