import { FoodModel } from "../models/foodModel.js";
import { OrderModel } from "../models/orderModel.js";

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
    const { id } = req.params;
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

// Place an order
export const placeOrder = async (req, res) => {
  try {
    const { cart } = req.body;
    if (!cart) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    let total = 0;
    // Calculate total amount
    cart.map((item) => {
      total += item.price;
    });

    const newOrder = new OrderModel({
      food: cart,
      payment: total,
      buyer: req.body.id,
    });

    await newOrder.save();
    res.status(201).send({
      success: true,
      message: "Order placed successfully",
      newOrder,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in placing order",
      error,
    });
  }
};

// Order Status
export const orderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const { status } = req.body;
    const order = await OrderModel.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: "Order status updated successfully",
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting order status",
    });
  }
};
