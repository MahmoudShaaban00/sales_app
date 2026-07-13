import express from "express";
import cors from "cors";
import { connectDB } from "./config/configdb.js";
import bootstrap from "./routesproject/bootstrap.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Enable CORS
app.use(
  cors({
    origin: [
      "https://salesapp-production-1867.up.railway.app",
      "http://localhost:3000",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);



// ✅ Parse JSON
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
bootstrap(app);

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running 🚀",
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    success: false,
    message: err?.message || JSON.stringify(err),
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});