import { Router } from "express";

import {
  createAnimal,
  getAnimal,
  updateAnimal,
  deleteAnimal,
  getAllAnimals,
} from "../controllers/animal.controllers.js";

const router = Router();

router.post("/:productId", createAnimal);

router.get("/", getAllAnimals);

router.get("/:id", getAnimal);

router.put("/:id", updateAnimal);

router.delete("/:id", deleteAnimal);

export default router;