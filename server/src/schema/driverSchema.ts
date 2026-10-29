import { z } from "zod";

export const createDriverSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(7),
  vehicleNo: z.string().min(2),
  password: z.string().min(6),
  townshipId: z.number().int().positive(),
});

export const updateDriverSchema = createDriverSchema.partial();