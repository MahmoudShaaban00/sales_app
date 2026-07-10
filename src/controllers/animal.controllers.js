import Product from "../models/product.js";
import AnimalDetails from "../models/animal.js";

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

export const getAnimal = async (req, res) => {
  try {
    const animal = await AnimalDetails.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    res.json({
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

export const updateAnimal = async (req, res) => {
  try {
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

    res.json({
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

export const deleteAnimal = async (req, res) => {
  try {
    const animal = await AnimalDetails.findById(req.params.id);

    if (!animal) {
      return res.status(404).json({
        success: false,
        message: "Animal not found",
      });
    }

    await Product.findOneAndUpdate(
      {
        detailsId: animal._id,
        detailsType: "Animal",
      },
      {
        $unset: {
          detailsId: "",
          detailsType: "",
        },
      }
    );

    await animal.deleteOne();

    res.json({
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

export const getAllAnimals = async (req, res) => {
  try {
    const animals = await AnimalDetails.find();
    res.json({
      success: true,
      data: animals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnimalsByProductId = async (req, res) => {
  try {
    const { productId } = req.params;
    const animals = await AnimalDetails.find({ productId });
    res.json({
      success: true,
      data: animals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAnimalsByType = async (req, res) => {
  try {
    const { type } = req.params;
    const animals = await AnimalDetails.find({ type });
    res.json({
      success: true,
      data: animals,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

