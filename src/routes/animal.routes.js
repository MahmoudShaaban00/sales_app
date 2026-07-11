import { Router } from "express";

import {
  createAnimal,
  getAnimal,
  updateAnimal,
  deleteAnimal,
  getAllAnimals,
} from "../controllers/animal.controllers.js";

import {protect} from "../middleware/auth.middleware.js";

const router = Router();

router.post("/:productId", protect, createAnimal);

router.get("/", protect, getAllAnimals);

router.get("/:id", protect, getAnimal);

router.put("/:id", protect, updateAnimal);

router.delete("/:id", protect, deleteAnimal);

export default router;