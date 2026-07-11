import mongoose from "mongoose";
import { area } from "../contants/governorates.js";

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
  match: [
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/,
    "Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.",
  ],
},

  phone: {
    type: String,
  },

  area: {
    type: String,
    enum: area,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

export default User;