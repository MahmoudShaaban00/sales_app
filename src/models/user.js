import mongoose from "mongoose";
import { governorates } from "../contants/governorates.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  phone: {
    type: String,
  },

  governorate: {
    type: String,
    enum: governorates,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;