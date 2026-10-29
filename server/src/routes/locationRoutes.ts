import { Router } from "express";
import {
  getCities,
  getTownshipsByCity,
} from "../controllers/locationController";

const router = Router();

router.get("/cities", getCities);
router.get("/cities/:cityId/townships", getTownshipsByCity);

export default router;