import { Router } from "express";
import {
  updateLocation,
  getLatestLocation,
} from "../controllers/gpsController";
import { deviceAuthMiddleware } from "../middleware/deviceAuthMiddleware";

const router = Router();

router.post(
  "/location",
  deviceAuthMiddleware,
  updateLocation
);

router.get(
  "/driver/:driverId/latest",
  getLatestLocation
);

export default router;