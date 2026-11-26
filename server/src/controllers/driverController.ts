import type { Request, Response } from "express";
import { hashSync } from "bcryptjs";
import prisma from "../db/prismaClient";
import { randomUUID } from "crypto";
import path from "path";
import fs from "fs";
import {
  createDriverSchema,
  updateDriverSchema,
} from "../schema/driverSchema";

export const createDriver = async (req: Request, res: Response) => {
 console.log("START API");
console.log("BODY:", req.body);
console.log("FILE:", req.file);
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

  let profilePath: string | null = null;

  // Profile image ပါလာရင်
  if (req.file) {
    const extension = path.extname(req.file.originalname);

    // unique image name
    const imageName = `driver-${randomUUID()}${extension}`;

    const uploadFolder = "uploads/profiles/drivers";

    const newPath = path.join(uploadFolder, imageName);

    // multer temp file ကို unique name နဲ့ rename
    fs.renameSync(req.file.path, newPath);

    // DB ထဲသိမ်းမယ့် string
    profilePath = `uploads/profiles/drivers/${imageName}`;
  }

  const driver = await prisma.driver.create({
    data: {
      ...data,
      password: hashSync(data.password, 10),
      profile: profilePath,
    },

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      profile: true,
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
      profile: true,
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
      profile: true,
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

  const existingDriver = await prisma.driver.findUnique({
    where: { id },
  });

  if (!existingDriver) {
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  const updateData: any = {
    ...data,
  };

  // Password ပါလာရင် hash ပြန်လုပ်
  if (data.password) {
    updateData.password = hashSync(data.password, 10);
  }

  // New profile image ပါလာရင်
  if (req.file) {
    const extension = path.extname(req.file.originalname);

    const imageName = `driver-${randomUUID()}${extension}`;

    const newPath =
      `uploads/profiles/drivers/${imageName}`;

    // temp image rename
    fs.renameSync(req.file.path, newPath);

    // old profile delete
    if (
      existingDriver.profile &&
      fs.existsSync(existingDriver.profile)
    ) {
      fs.unlinkSync(existingDriver.profile);
    }

    // DB မှာ path string update
    updateData.profile = newPath;
  }

  const driver = await prisma.driver.update({
    where: { id },

    data: updateData,

    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      vehicleNo: true,
      profile: true,
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

export const deleteDriver = async (
  req: Request,
  res: Response
) => {
  const id = Number(req.params.id);

  const driver = await prisma.driver.findUnique({
    where: { id },
  });

  if (!driver) {
    return res.status(404).json({
      success: false,
      message: "Driver not found",
    });
  }

  // Database records အရင် delete
  await prisma.$transaction([
    prisma.gPSLocation.deleteMany({
      where: {
        driverId: id,
      },
    }),

    prisma.driver.delete({
      where: {
        id,
      },
    }),
  ]);

  // DB delete success ဖြစ်ပြီးမှ profile image delete
  if (
    driver.profile &&
    fs.existsSync(driver.profile)
  ) {
    fs.unlinkSync(driver.profile);
  }

  return res.json({
    success: true,
    message: "Driver deleted successfully",
  });
};