import { Router } from "express";
import {
  createDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from "../controllers/driverController";

const router = Router();

router.post("/", createDriver);
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.put("/:id", updateDriver);

export default router;