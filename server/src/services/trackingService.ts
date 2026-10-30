import prisma from "../db/prismaClient";

export const saveDriverLocation = async (
  driverId: number,
  latitude: number,
  longitude: number
) => {
  return prisma.gPSLocation.create({
    data: {
      driverId,
      latitude,
      longitude,
    },
  });
};

export const getLatestDriverLocation = async (driverId: number) => {
  return prisma.gPSLocation.findFirst({
    where: {
      driverId,
    },
    orderBy: {
      recordedAt: "desc",
    },
  });
};