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
router.get("/", getProducts);

// Get single product
router.get("/:id", getProductById);

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
  upload.array("images", 20),
  updateProduct
);

// Delete Product
router.delete(
  "/:id",
  deleteProduct
);

// Admin: Delete any product (optional)
router.delete(
  "/:id",
  deleteProduct
);

export default router;