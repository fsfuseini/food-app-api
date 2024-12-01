import { UserModel } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// REGISTER USER
export const registerUser = async (req, res) => {
  try {
    const { userName, email, password, address, phone, answer } = req.body;
    // Validation
    if (!userName || !email || !password || !address || !phone || !answer) {
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
    await UserModel.create({
      userName,
      email,
      password: hashedPassword,
      address,
      phone,
      answer,
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
      expiresIn: "24hr",
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

// RESET PASSWORD
export const resetPassword = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    // Validation
    if (!email || !answer || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "All fields are required",
      });
    }
    // Check user exists
    const user = await UserModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found or Incorrect answer",
      });
    }
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    // Update password
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in resetting password",
      error,
    });
  }
};

// UPDATE PASSWORD
export const updatePassword = async (req, res) => {
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
    // Get data from user
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Please provide Old or New Password",
      });
    }
    // Check password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid old password",
      });
    }
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();
    res.status(200).send({
      success: true,
      message: "Password Updated",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in updating password",
      error,
    });
  }
};

// DELETE USER

export const deleteUser = async (req, res) => {
  try {
    await UserModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Your account has been deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in deleting User",
      error,
    });
  }
};

// LOGOUT USER
export const logoutUser = async (req, res) => {
  try {
    // Remove token from cookies or headers
    res.clearCookie("token");
    res.header("Authorization", "");
    res.status(200).send({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in logging out user",
      error,
    });
  }
};
