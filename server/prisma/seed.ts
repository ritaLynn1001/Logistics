import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

async function main() {
  const yangon = await prisma.city.upsert({
    where: {
      name: "Yangon",
    },
    update: {},
    create: {
      name: "Yangon",
    },
  });

  await prisma.township.upsert({
    where: {
      name_cityId: {
        name: "Hlaing",
        cityId: yangon.id,
      },
    },
    update: {},
    create: {
      name: "Hlaing",
      cityId: yangon.id,
    },
  });

  await prisma.township.upsert({
    where: {
      name_cityId: {
        name: "Kamayut",
        cityId: yangon.id,
      },
    },
    update: {},
    create: {
      name: "Kamayut",
      cityId: yangon.id,
    },
  });

  console.log("Seed data added successfully");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });