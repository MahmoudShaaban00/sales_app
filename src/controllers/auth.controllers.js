import bcrypt from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";

// Register
const register = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      repassword,
      phone,
      area,
      role,
    } = req.body;

    // Check required fields
    if (!name || !email || !password || !repassword || !area) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields",
      });
    }

    // Password validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters long and contain uppercase, lowercase, number and special character.",
      });
    }

    // Check password confirmation
    if (password !== repassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    // Check email
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      area,
      role,
    });

    // Create token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
 
    );

    user.password = undefined;

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Login
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Please fill in all required fields",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
   
    );

    user.password = undefined;

    return res.status(200).json({
      success: true,
      token,
      user,
      isAdmin: user.role === "admin",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
};

export { register, signin };