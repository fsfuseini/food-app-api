import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createFood, getAllFoods, getSingleFood, updateFood, deleteFood } from "../conttrollers/foodController.js";

// Create a router instance
const foodRouter = Router();

// Routes
// Create a new food
foodRouter.post("/food/create", authMiddleware, createFood);

// Get all food
foodRouter.get("/foods", getAllFoods);

// Get a single food
foodRouter.get("/foods/:id", getSingleFood);

// Update a food
foodRouter.put("/food/update/:id", authMiddleware, updateFood);

// Delete a food
foodRouter.delete("/food/delete/:id", authMiddleware, deleteFood);
// Export the router
export default foodRouter;