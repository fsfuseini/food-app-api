import express from "express";
import cors from "cors";
import { connectDB } from "./src/config/db.js";

// DB Connection
connectDB();

// Rest object
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  return res
    .status(200)
    .send("<h1>Welcome to Belly Full! An API for Belly Full</h1>");
});

// PORT - Parse the PORT as a number
const PORT = process.env.PORT ? Number(process.env.PORT) : 3000; // parseInt also works

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
