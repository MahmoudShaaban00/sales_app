import Product from "../models/product.js";
import AnimalDetails from "../models/animal.js";

// ==========================
// Create Animal
// ==========================
export const createAnimal = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // السماح لصاحب المنتج فقط
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to add animal details",
      });
    }

    const animal = await AnimalDetails.create(req.body);

    product.detailsType = "Animal";
    product.detailsId = animal._id;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Animal created successfully",
      data: {
        product,
        animal,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Animal
// ==========================
export const getAnimal = async (req, res) => {
  try {
    const animal = await AnimalDetails.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    res.status(200).json({
      success: true,
      data: animal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Update Animal
// ==========================
export const updateAnimal = async (req, res) => {
  try {
    const product = await Product.findOne({
      detailsId: req.params.id,
      detailsType: "Animal",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // السماح لصاحب المنتج فقط
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this animal",
      });
    }

    const animal = await AnimalDetails.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Animal updated successfully",
      data: animal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Delete Animal
// ==========================
export const deleteAnimal = async (req, res) => {
  try {
    const product = await Product.findOne({
      detailsId: req.params.id,
      detailsType: "Animal",
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    // السماح لصاحب المنتج فقط
    if (product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this animal",
      });
    }

    const animal = await AnimalDetails.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    product.detailsId = null;
    product.detailsType = null;

    await product.save();
    await animal.deleteOne();

    res.status(200).json({
      success: true,
      message: "Animal deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get All Animals
// ==========================
export const getAllAnimals = async (req, res) => {
  try {
    const animals = await AnimalDetails.find();

    res.status(200).json({
      success: true,
      results: animals.length,
      data: animals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Animals By Product Id
// ==========================
export const getAnimalsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product || !product.detailsId) {
      return res.status(404).json({
        success: false,
        message: "No animal details found",
      });
    }

    const animal = await AnimalDetails.findById(product.detailsId);

    res.status(200).json({
      success: true,
      data: animal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ==========================
// Get Animals By Type
// ==========================
export const getAnimalsByType = async (req, res) => {
  try {
    const { type } = req.params;

    const animals = await AnimalDetails.find({ type });

    res.status(200).json({
      success: true,
      results: animals.length,
      data: animals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};