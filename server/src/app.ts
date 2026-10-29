import express from "express";
import cors from "cors";
import rootRouter from "./routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  return res.status(200).json({
    success: true,
    message: "Secure Logistics backend is running",
  });
});

app.use("/api", rootRouter);

export default app;