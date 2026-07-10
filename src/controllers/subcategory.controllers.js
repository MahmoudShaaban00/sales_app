import SubCategory from "../models/subcategory.js";

// Create a new subcategory
export const createSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = new SubCategory({ name, category });
    await subCategory.save();
    res.status(201).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all subcategories
export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await SubCategory.find().populate("category");
    res.status(200).json(subCategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a subcategory by ID
export const getSubCategoryById = async (req, res) => {
  try {
    const subCategory = await SubCategory.findById(req.params.id).populate("category");
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a subcategory by ID
export const updateSubCategory = async (req, res) => {
  try {
    const { name, category } = req.body;
    const subCategory = await SubCategory.findByIdAndUpdate(
      req.params.id,
      { name, category },
      { new: true }
    ).populate("category");
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json(subCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a subcategory by ID
export const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.findByIdAndDelete(req.params.id);
    if (!subCategory) {
      return res.status(404).json({ message: "Subcategory not found" });
    }
    res.status(200).json({ message: "Subcategory deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

