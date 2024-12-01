import { RestaurantModel } from "../models/restaurantModel.js";

// Create a new restaurant
export const creareRestaurant = async (req, res) => {
  try {
    const {
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    } = req.body;
    // Validation
    if (!title || !coords) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newRestaurant = await RestaurantModel.create({
      title,
      imageUrl,
      foods,
      time,
      pickup,
      delivery,
      isOpen,
      logoUrl,
      rating,
      ratingCount,
      code,
      coords,
    });
    res.status(201).send({
      success: true,
      message: "Restaurant created successfully",
      newRestaurant,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating restaurant",
      error,
    });
  }
};

// Get all restaurants
export const getAllRestaurants = async (req, res) => {
  try {
    const restaurants = await RestaurantModel.find({});
    if (restaurants.length === 0) {
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }else if(!restaurants){
      return res.status(404).send({
        success: false,
        message: "No restaurants found",
      });
    }
    res.status(200).send({
      success: true,
      message: "Restaurants fetched successfully",
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting restaurants",
      error,
    });
  }
};

// Get a single restaurant
export const getSingleRestaurant = async (req, res) => { 
  try {
    const restaurantId = req.params.id;
    if (!restaurantId) {
      return res.status(404).send({
        success: false,
        message: "Please provide Restaurant ID",
      });
    }
    // Find restaurant
    const restaurant = await RestaurantModel.findById(restaurantId);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });

  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting restaurant",
      error,
    });
  }
};

// Delete Restaurant
export const deleteRestaurant = async (req, res) => { 
  try {
    const restaurntId = req.params.id;
    if (!restaurntId) {
      return res.status(404).send({
        success: false,
        message: "Restaurant not found"
      })
    }
    await RestaurantModel.findByIdAndDelete(restaurntId);
    res.status(200).send({
      success: true,
      message: "Restaurant deleted successfully"
    })
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting Restaurant",
      error,
})
  }
};