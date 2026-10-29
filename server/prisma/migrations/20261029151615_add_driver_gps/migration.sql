-- CreateEnum
CREATE TYPE "DriverStatus" AS ENUM ('ACTIVE', 'BUSY');

-- CreateTable
CREATE TABLE "Driver" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "vehicleNo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "status" "DriverStatus" NOT NULL DEFAULT 'ACTIVE',
    "townshipId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Driver_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GPSLocation" (
    "id" SERIAL NOT NULL,
    "driverId" INTEGER NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "recordedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GPSLocation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Driver_email_key" ON "Driver"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Driver_vehicleNo_key" ON "Driver"("vehicleNo");

-- CreateIndex
CREATE INDEX "GPSLocation_driverId_recordedAt_idx" ON "GPSLocation"("driverId", "recordedAt");

-- AddForeignKey
ALTER TABLE "Driver" ADD CONSTRAINT "Driver_townshipId_fkey" FOREIGN KEY ("townshipId") REFERENCES "Township"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GPSLocation" ADD CONSTRAINT "GPSLocation_driverId_fkey" FOREIGN KEY ("driverId") REFERENCES "Driver"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
