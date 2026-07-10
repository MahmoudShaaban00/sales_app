import { Router } from "express";
import {createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory} from "../controllers/category.controllers.js";

const router = Router();

router.post("/", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.put("/:id", updateCategory);
router.delete("/:id", deleteCategory);

export default router;