import { Router } from "express";
import {authMiddleware} from "../middlewares/authMiddleware.js";
import { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } from "../conttrollers/categoryController.js";

// Create a router instance
const categoryRouter = Router();

// Routes
// Create a new category
categoryRouter.post("/category/create", authMiddleware, createCategory);

// Get all categories
categoryRouter.get("/categories", getAllCategories);

// Get a single category
categoryRouter.get("/categories/:id", getSingleCategory);

// Update a category
categoryRouter.put("/category/update/:id", authMiddleware, updateCategory);

// Delete a category
categoryRouter.delete("/category/delete/:id", authMiddleware, deleteCategory);

// Export the router
export default categoryRouter;