import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);

    console.log("MongoDB Connected");

    try {
      await mongoose.connection
        .collection("products")
        .dropIndex("productCode_1");

      console.log("✅ productCode index removed");
    } catch (err) {
      console.log("Index already removed");
    }
  } catch (error) {
    console.log(error);
  }
};