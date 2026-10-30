import type { Request, Response, NextFunction } from "express";

export const deviceAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.header("x-api-key");

  if (!apiKey || apiKey !== process.env.ESP32_API_KEY) {
    return res.status(401).json({
      success: false,
      message: "Invalid device API key",
    });
  }

  next();
};