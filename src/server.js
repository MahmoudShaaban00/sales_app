import express from "express";
import { connectDB } from "./config/configdb.js";
import bootstrap from "./routesproject/bootstrap.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ 1. middleware لازم الأول
app.use(express.json());

// ✅ 2. connect DB
connectDB();

// ✅ 3. routes
bootstrap(app);

// test route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running 🚀",
  });
});

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