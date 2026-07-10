import mongoose from "mongoose";

const vehicleDetailsSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    vehicleType: {
  type: String,
  enum: [
    "car",
    "taxi",
    "motorcycle",
    "microbus",
    "van",
    "pickup",
    "truck",
    "bus",
    "equipment",
    "other",
  ],
  required: true,
},

    // ======================
    // Common Fields
    // ======================

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    kilometers: {
      type: Number,
      required: function () {
        return this.vehicleType !== "equipment";
      },
    },

    transmission: {
      type: String,
      enum: ["automatic", "manual"],
      required: function () {
        return this.vehicleType !== "equipment";
      },
    },

    fuelType: {
      type: String,
      enum: ["gasoline", "diesel", "electric", "hybrid"],
      required: function () {
        return this.vehicleType !== "equipment";
      },
    },

    condition: {
      type: String,
      enum: ["new", "used"],
      required: true,
    },

    // ======================
    // Cars / Taxi
    // ======================

    bodyType: {
      type: String,
      enum: [
        "sedan",
        "suv",
        "hatchback",
        "coupe",
        "pickup",
        "van",
      ],
      required: function () {
        return ["car", "taxi"].includes(this.vehicleType);
      },
    },

    doors: {
      type: Number,
      required: function () {
        return ["car", "taxi"].includes(this.vehicleType);
      },
    },

    engineCC: {
      type: Number,
      required: function () {
        return [
          "car",
          "taxi",
          "motorcycle",
        ].includes(this.vehicleType);
      },
    },

    licenseValid: Boolean,

    licenseExpiry: Date,

    firstOwner: Boolean,

    // ======================
    // Motorcycle
    // ======================

    cooling: {
      type: String,
      enum: ["air", "water"],
      required: function () {
        return this.vehicleType === "motorcycle";
      },
    },

    // ======================
    // Microbus / Bus
    // ======================

    seats: {
      type: Number,
      required: function () {
        return [
          "microbus",
          "bus",
        ].includes(this.vehicleType);
      },
    },

    // ======================
    // Heavy Equipment
    // ======================

    equipmentType: {
      type: String,
      required: function () {
        return this.vehicleType === "equipment";
      },
    },

    operatingHours: {
      type: Number,
      required: function () {
        return this.vehicleType === "equipment";
      },
    },

    power: {
      type: String,
      required: function () {
        return this.vehicleType === "equipment";
      },
    },

    weight: {
      type: String,
      required: function () {
        return this.vehicleType === "equipment";
      },
    },

    // ======================
    // Features
    // ======================

    features: [String],

    // ======================
    // Rent
    // ======================

    rentDetails: {
      dailyPrice: Number,
      weeklyPrice: Number,
      monthlyPrice: Number,
      minimumRent: Number,
      driverAvailable: Boolean,
    },

    // ======================
    // Accident
    // ======================

    accidentDetails: {
      damageLevel: {
        type: String,
        enum: [
          "light",
          "medium",
          "heavy",
        ],
      },

      movable: Boolean,

      spareParts: Boolean,
    },

    // ======================
    // Exchange
    // ======================

    exchangeDetails: {
      exchangeWith: {
        type: String,
        enum: [
          "same_category",
          "any_car",
          "motorcycle",
          "equipment",
        ],
      },

      priceDifference: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "VehicleDetails",
  vehicleDetailsSchema
);