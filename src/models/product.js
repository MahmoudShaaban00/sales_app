import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    images: [
      {
        secure_url: String,
        public_id: String,
      },
    ],

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },

    listingType: {
      type: String,
      enum: ["sale", "rent", "exchange", "accident"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    negotiable: {
      type: Boolean,
      default: false,
    },

    governorate: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["active", "pending", "sold", "deleted"],
      default: "active",
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // نوع التفاصيل
    detailsType: {
      type: String,
      enum: [
        "Vehicle",
        "Animal",
        "Property",
        "Land",
        "Job",
      ],
      required: true,
    },

    // id الخاص بجدول التفاصيل
   detailsId: {
  type: mongoose.Schema.Types.ObjectId,
}
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Product", productSchema);