import type { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import prisma from "../db/prismaClient";
import {
  createDriverSchema,
  updateDriverSchema,
} from "../schema/driverSchema";

export const createDriver = async (req: Request, res: Response) => {
  const data = createDriverSchema.parse(req.body);

  const township = await prisma.township.findUnique({
    where: { id: data.townshipId },
  });

  if (!township) {
    return res.status(400).json({
      success: false,
      message: "Invalid township",
    });
  }

  const driver = await prisma.driver.create({
    data: {
      ...data,
      password: hashSync(data.password, 10),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      status: true,
      townshipId: true,
      createdAt: true,
    },
  });

  return res.status(201).json({
    success: true,
    message: "Driver created successfully",
    data: driver,
  });
};

export const getDrivers = async (_req: Request, res: Response) => {
  const drivers = await prisma.driver.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      status: true,
      townshipId: true,
      createdAt: true,
    },
  });

  return res.json({
    success: true,
    data: drivers,
  });
};

export const getDriverById = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const driver = await prisma.driver.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      status: true,
      townshipId: true,
      createdAt: true,
    },
  });

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  return res.json({
    success: true,
    data: driver,
  });
};

export const updateDriver = async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const data = updateDriverSchema.parse(req.body);

  const driver = await prisma.driver.update({
    where: { id },
    data: {
      ...data,
      ...(data.password && {
        password: hashSync(data.password, 10),
      }),
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      status: true,
      townshipId: true,
      createdAt: true,
    },
  });

  return res.json({
    success: true,
    message: "Driver updated successfully",
    data: driver,
  });
};