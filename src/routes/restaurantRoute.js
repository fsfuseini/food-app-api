import { Router } from "express";
import { creareRestaurant, deleteRestaurant, getAllRestaurants, getSingleRestaurant } from "../conttrollers/restaurantController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";


// Create a router instance
const restaurantRouter = Router();

// Routes
// Create a new restaurant
restaurantRouter.post("/restaurant/create",authMiddleware, creareRestaurant);

// Get all restaurants
restaurantRouter.get("/restaurants", getAllRestaurants);

// Get a single restaurant
restaurantRouter.get("/restaurants/:id", getSingleRestaurant);

// Delete Restaurant
restaurantRouter.delete("/restaurant/delete/:id", authMiddleware, deleteRestaurant);

// Export the router
export default restaurantRouter;