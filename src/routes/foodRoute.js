import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { createFood, getAllFoods, getSingleFood, updateFood, deleteFood, placeOrder, orderStatus } from "../conttrollers/foodController.js";
import { adminMiddleware } from "../middlewares/adminMiddleware.js";

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

// Place an order
foodRouter.post("/food/placeorder", authMiddleware, placeOrder);

// Order Status
foodRouter.post("/food/orderstatus/:id", authMiddleware, adminMiddleware, orderStatus);




// Export the router
export default foodRouter;