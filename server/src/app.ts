import express from "express";
import cors from "cors";
import prisma from "./db/prismaClient";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({
    success: true,
    message: "Backend is running",
  });
});

app.get("/db-health", async (_req, res) => {
  await prisma.city.findMany();

  res.json({
    success: true,
    message: "Database connected",
  });
});

export default app;