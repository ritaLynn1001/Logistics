import type { Request, Response } from "express";
import prisma from "../db/prismaClient";
import {
  saveDriverLocation,
  getLatestDriverLocation,
} from "../services/trackingService";

export const updateLocation = async (req: Request, res: Response) => {
  const { driverId, latitude, longitude } = req.body;

  if (
    typeof driverId !== "number" ||
    typeof latitude !== "number" ||
    typeof longitude !== "number"
  ) {
    return res.status(400).json({
      success: false,
      message: "driverId, latitude and longitude are required",
    });
  }

  if (
    latitude < -90 ||
    latitude > 90 ||
    longitude < -180 ||
    longitude > 180
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid GPS coordinates",
    });
  }

  const driver = await prisma.driver.findUnique({
    where: { id: driverId },
  });

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  const location = await saveDriverLocation(
    driverId,
    latitude,
    longitude
  );

  return res.status(201).json({
    success: true,
    message: "Location updated successfully",
    data: location,
  });
};

export const getLatestLocation = async (
  req: Request,
  res: Response
) => {
  const driverId = Number(req.params.driverId);

  if (Number.isNaN(driverId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid driver id",
    });
  }

  const location = await getLatestDriverLocation(driverId);

  if (!location) {
    return res.status(404).json({
      success: false,
      message: "Location not found",
    });
  }

  return res.json({
    success: true,
    data: location,
  });
};