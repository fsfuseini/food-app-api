import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, address, phone } = req.body;
    // Validation
    if (!userName || !email || !password || !address || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check user already exists
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    //   Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Create new user
    const user = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
    });
    res.status(201).send({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in registering user",
    });
  }
};

// LOGIN USER
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Check user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid credentials",
      });
    }
    // Create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
      expiresIn: "1hr",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "User logged in successfully",
      token,
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in login user",
      error,
    });
  }
};

// GET USER INFO
export const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById({ _id: req.body.id }, { _id: 0 });
    // Validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    // Hide password
    user.password = undefined;
    // Send response
    res.status(200).send({
      success: true,
      message: "User info fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in getting user info",
      error,
    });
  }
};

// UPDATE USER INFO
export const updateUserInfo = async (req, res) => {
    try {
        // Find user
        const user = await UserModel.findById({ _id: req.body.id });
        // Validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User not found",
            });
        }
        // Update user
        const { userName, address, phone } = req.body;
        if (userName) {
            user.userName = userName;
        }
        if (address) {
            user.address = address;
        }
        if (phone) {
            user.phone = phone;
        }
        await user.save();
        res.status(200).send({
            success: true,
            message: "User info updated successfully",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in updating user info",
            error,
        });
    }
};