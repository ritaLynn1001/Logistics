import { Router } from "express";
import driverRoutes from "./driverRoutes";
import locationRoutes from "./locationRoutes";
import gpsRoutes from "./gpsRoutes";
const router = Router();

router.use("/drivers", driverRoutes);
router.use("/locations", locationRoutes);
router.use("/tracking", gpsRoutes);

export default router;