import { Router } from "express";
import {
  createDriver,
  deleteDriver,
  getDriverById,
  getDrivers,
  updateDriver,
} from "../controllers/driverController";
import { uploadDriverProfile } from "../middleware/uploadDriverProfile.js";

const router = Router();

router.post(
  "/",
  uploadDriverProfile.single("profile"),
  createDriver
);
router.get("/", getDrivers);
router.get("/:id", getDriverById);
router.put(
  "/:id",
  uploadDriverProfile.single("profile"),
  updateDriver
);
router.delete("/:id", deleteDriver);

export default router;