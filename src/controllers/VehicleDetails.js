import mongoose from "mongoose";
import Product from "../models/product.js";
import VehicleDetails from "../models/VehicleDetailsSchema.js";

// ======================================
// Create Vehicle Details
// ======================================
export const createVehicle = async (req, res) => {
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
        message: "You are not authorized to add vehicle details",
      });
    }

    const vehicle = await VehicleDetails.create({
      product: product._id,
      ...req.body,
    });

    product.detailsType = "Vehicle";
    product.detailsId = vehicle._id;

    await product.save();

    res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: {
        product,
        vehicle,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Update Vehicle
// ======================================
export const updateVehicle = async (req, res) => {
  try {
    const { id } = req.params;

    const vehicle = await VehicleDetails.findById(id).populate("product");

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // السماح لصاحب المنتج فقط
    if (vehicle.product.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to update this vehicle",
      });
    }

    Object.assign(vehicle, req.body);

    await vehicle.save();

    res.status(200).json({
      success: true,
      message: "Vehicle updated successfully",
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get Vehicle
// ======================================
export const getVehicle = async (req, res) => {
  try {
    const vehicle = await VehicleDetails.findById(req.params.id).populate(
      "product"
    );

    if (!vehicle) {
      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    res.status(200).json({
      success: true,
      data: vehicle,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Delete Vehicle
// ======================================
export const deleteVehicle = async (req, res) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const { id } = req.params;

    const vehicle = await VehicleDetails.findById(id)
      .populate("product")
      .session(session);

    if (!vehicle) {
      await session.abortTransaction();
      session.endSession();

      return res.status(404).json({
        success: false,
        message: "Vehicle not found",
      });
    }

    // السماح لصاحب المنتج فقط
    if (vehicle.product.user.toString() !== req.user._id.toString()) {
      await session.abortTransaction();
      session.endSession();

      return res.status(403).json({
        success: false,
        message: "You are not authorized to delete this vehicle",
      });
    }

    await Product.findByIdAndUpdate(
      vehicle.product._id,
      {
        $unset: {
          detailsId: "",
          detailsType: "",
        },
      },
      { session }
    );

    await vehicle.deleteOne({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Vehicle deleted successfully",
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// Get All Vehicles
// ======================================
export const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await VehicleDetails.find().populate(
      "product",
      "title user"
    );

    res.status(200).json({
      success: true,
      results: vehicles.length,
      data: vehicles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};