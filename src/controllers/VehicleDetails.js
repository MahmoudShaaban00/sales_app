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
        success:false,
        message:"Product not found"
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
      success:true,
      message:"Vehicle created successfully",
      data:{
        product,
        vehicle
      }
    });


  } catch(error){

    res.status(500).json({
      success:false,
      message:error.message
    });

  }
};

// ======================================
// Update Vehicle
// ======================================
export const updateVehicle = async (req, res) => {

    try {

        const { id } = req.params;

        const vehicle = await VehicleDetails.findByIdAndUpdate(

            id,

            req.body,

            {
                new: true,
                runValidators: true
            }

        );

        if (!vehicle) {

            return res.status(404).json({

                success: false,
                message: "Vehicle not found"

            });

        }

        res.json({

            success: true,
            message: "Vehicle updated successfully",
            data: vehicle

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};



// ======================================
// Get Vehicle
// ======================================
export const getVehicle = async (req, res) => {

    try {

        const vehicle = await VehicleDetails.findById(req.params.id);

        if (!vehicle) {

            return res.status(404).json({

                success: false,
                message: "Vehicle not found"

            });

        }

        res.json({

            success: true,
            data: vehicle

        });

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

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

        const vehicle = await VehicleDetails.findById(id).session(session);

        if (!vehicle) {

            await session.abortTransaction();
            session.endSession();

            return res.status(404).json({

                success: false,
                message: "Vehicle not found"

            });

        }

        await Product.findOneAndUpdate(

            {
                detailsId: vehicle._id,
                detailsType: "Vehicle"
            },

            {
                $unset: {

                    detailsId: "",
                    detailsType: ""

                }
            },

            { session }

        );

        await vehicle.deleteOne({ session });

        await session.commitTransaction();
        session.endSession();

        res.json({

            success: true,
            message: "Vehicle deleted successfully"

        });

    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

export const getAllVehicles = async (req, res) => {

    try {
        const vehicles = await VehicleDetails.find();
        res.json({
            success: true,
            data: vehicles,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

