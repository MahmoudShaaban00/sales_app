import { Router } from "express";
import { upload } from "../middleware/upload.js";
import { protect } from "../middleware/auth.middleware.js";

import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controllers.js";


const router = Router();

// ==========================
// Public Routes
// ==========================

// Get all products
router.get("/", protect, getProducts);

// Get single product
router.get("/:id", protect, getProductById);

// ==========================
// Protected Routes
// ==========================

// Create Product
router.post(
  "/",
  protect,
  upload.array("images", 20),
  createProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  upload.array("images", 20),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  protect,
  deleteProduct
);


export default router;