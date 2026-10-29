import type { Request, Response } from "express";
import prisma from "../db/prismaClient";

export const getCities = async (_req: Request, res: Response) => {
  const cities = await prisma.city.findMany({
    orderBy: {
      name: "asc",
    },
  });

  return res.json({
    success: true,
    data: cities,
  });
};

export const getTownshipsByCity = async (
  req: Request,
  res: Response
) => {
  const cityId = Number(req.params.cityId);

  if (Number.isNaN(cityId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid city id",
    });
  }

  const city = await prisma.city.findUnique({
    where: {
      id: cityId,
    },
  });

  if (!city) {
    return res.status(404).json({
      success: false,
      message: "City not found",
    });
  }

  const townships = await prisma.township.findMany({
    where: {
      cityId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return res.json({
    success: true,
    data: townships,
  });
};