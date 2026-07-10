import { Router } from "express";

import {

createVehicle,
updateVehicle,
deleteVehicle,
getVehicle,
getAllVehicles

} from "../controllers/VehicleDetails.js";

const router = Router();

router.post("/:productId", createVehicle);

router.get("/", getAllVehicles);

router.get("/:id", getVehicle);

router.put("/:id", updateVehicle);

router.delete("/:id", deleteVehicle);

export default router;