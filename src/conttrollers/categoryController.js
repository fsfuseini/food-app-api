import { CategoryModel } from "../models/categoryModel.js";
// Create a new category
export const createCategory = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    // Validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "Please provide all required fields",
      });
    }
    const newCategory = await CategoryModel.create({
      title,
      imageUrl,
    });
    res.status(201).send({
      success: true,
      message: "Category created successfully",
      newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in creating category",
      error,
    });
  }
};

// Get all categories
export const getAllCategories = async (req, res) => {
  try {
    const categories = await CategoryModel.find({});
    res.status(200).send({
      success: true,
      message: "Categories fetched successfully",
      categories,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting categories",
      error,
    });
  }
};

// Get a single category
export const getSingleCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id);
    res.status(200).send({
      success: true,
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting category",
      error,
    });
  }
};

// Update a category
export const updateCategory = async (req, res) => {
    try {
        const {id} = req.params;
        const { title, imageUrl } = req.body;
        const updateCategory = await CategoryModel.findByIdAndUpdate(id, {
            title,
            imageUrl,
        });
        if (!updateCategory) {
            return res.status(404).send({
                success: false,
                message: "Category not found",
            });
        }
        res.status(200).send({
            success: true,
            message: "Category updated successfully",
            updateCategory,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating category",
            error,
        });
    }
 };

// Delete a category
export const deleteCategory = async (req, res) => {
    try {
        const {id} = req.params;
        await CategoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in deleting category",
            error,
        });
    }
 };