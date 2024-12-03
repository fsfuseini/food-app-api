import { FoodModel } from "../models/foodModel.js";

// Create a new food
export const createFood = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    } = req.body;
    // Validation
    if (!title || !description || !price || !restaurant) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newFood = await FoodModel.create({
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
      isAvailable,
      restaurant,
      rating,
    });
    res.status(201).send({
      success: true,
      message: "Food item created successfully",
      newFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating food",
      error,
    });
  }
};

// Get all foods
export const getAllFoods = async (req, res) => {
  try {
    const foods = await FoodModel.find({});
    res.status(200).send({
      success: true,
      message: "Foods fetched successfully",
      foods,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting foods",
      error,
    });
  }
};

// Get a single food
export const getSingleFood = async (req, res) => {
  try {
    const food = await FoodModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting food",
      error,
    });
  }
};

// Update a food
export const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, imageUrl, foodTags, category, code } =
      req.body;
    const updateFood = await FoodModel.findByIdAndUpdate(id, {
      title,
      description,
      price,
      imageUrl,
      foodTags,
      category,
      code,
    });
    if (!updateFood) {
      return res.status(404).send({
        success: false,
        message: "Food not found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Food updated successfully",
      updateFood,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating food",
      error,
    });
  }
};

// Delete a food
export const deleteFood = async (req, res) => {
    try {    
        const {id} = req.params;
        await FoodModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Food deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting food",
            error,
        });
    }
 };