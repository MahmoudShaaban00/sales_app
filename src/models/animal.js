import mongoose from "mongoose";

const animalSchema = new mongoose.Schema(
  {
    animalType: {
      type: String,
      required: true,
      enum: [
        "Cow",
        "Buffalo",
        "Camel",
        "Horse",
        "Sheep",
        "Goat",
        "Dog",
        "Cat",
        "Bird",
        "Fish",
        "Other",
      ],
    },

    breed: {
      type: String,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
    },

    age: Number,

    weight: Number,

    color: String,

    healthStatus: {
      type: String,
      enum: ["Excellent", "Good", "Average", "Needs Treatment"],
    },

    vaccinated: {
      type: Boolean,
      default: false,
    },

    hasPassport: {
      type: Boolean,
      default: false,
    },

    purpose: {
      type: String,
      enum: ["Meat", "Milk", "Breeding", "Pet", "Work", "Other"],
    },

    features: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("AnimalDetails", animalSchema);