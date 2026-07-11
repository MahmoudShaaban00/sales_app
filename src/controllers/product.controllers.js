import Product from "../models/product.js";
import Category from "../models/category.js";
import SubCategory from "../models/subcategory.js";

// =============================
// Create Product
// =============================
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      subCategory,
      listingType,
      price,
      negotiable,
      governorate,
      city,
      phone,
      detailsType,
    } = req.body;

    // Check Category
    const categoryExists = await Category.findById(category);

    if (!categoryExists) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    // Check SubCategory
    const subCategoryExists = await SubCategory.findById(subCategory);

    if (!subCategoryExists) {
      return res.status(404).json({
        success: false,
        message: "SubCategory not found",
      });
    }

    // Upload Images
    const images =
      req.files?.map((file) => ({
        secure_url: file.path,
        public_id: file.filename,
      })) || [];

    // Generate Product Code
    const lastProduct = await Product.findOne().sort({ createdAt: -1 });

    let productCode = "PRD-000001";

    if (lastProduct && lastProduct.productCode) {
      const lastNumber = parseInt(
        lastProduct.productCode.split("-")[1],
        10
      );

      productCode = `PRD-${String(lastNumber + 1).padStart(6, "0")}`;
    }

    // Create Product
    const product = await Product.create({
      productCode,
      title,
      description,
      images,
      category,
      subCategory,
      listingType,
      price,
      negotiable,
      governorate,
      city,
      phone,
      detailsType,
      detailsId: null,
      user: req.user._id,
    });

    const data = await Product.findById(product._id)
      .populate("category")
      .populate("subCategory")
      .populate("user", "name email phone");

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      data,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get All Products
// =============================
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate("category", "name")
      .populate("subCategory", "name")
      .populate("user", "name phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      results: products.length,
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Get Product By Id
// =============================
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate("category")
      .populate("subCategory")
      .populate("user", "name email phone");

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


// =============================
// Update Product
// =============================
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Ownership
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this product",
      });
    }

    if (req.body.title) product.title = req.body.title;
    if (req.body.description) product.description = req.body.description;
    if (req.body.price) product.price = req.body.price;
    if (req.body.phone) product.phone = req.body.phone;
    if (req.body.city) product.city = req.body.city;
    if (req.body.governorate) product.governorate = req.body.governorate;
    if (req.body.negotiable !== undefined)
      product.negotiable = req.body.negotiable;
    if (req.body.listingType)
      product.listingType = req.body.listingType;

    if (req.files?.length) {
      product.images = req.files.map((file) => ({
        secure_url: file.path,
        public_id: file.filename,
      }));
    }

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =============================
// Delete Product
// =============================
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // Check Ownership
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this product",
      });
    }

    await product.deleteOne();

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};