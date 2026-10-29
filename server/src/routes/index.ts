import { Router } from "express";
import driverRoutes from "./driverRoutes";
import locationRoutes from "./locationRoutes";

const router = Router();

router.use("/drivers", driverRoutes);
router.use("/locations", locationRoutes);

export default router;