import { Router } from "express";
import {
  registerUser,
  loginUser,
  getUserInfo,
  updateUserInfo,
  resetPassword,
  updatePassword,
} from "../conttrollers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const userRouter = Router();

// Routes
// Register User - POST
userRouter.post("/user/register", registerUser);

// Login User - POST
userRouter.post("/user/login", loginUser);

// Get User Info - GET
userRouter.get("/user/profile", authMiddleware, getUserInfo);

// Update User Info - PUT
userRouter.put("/user/update", authMiddleware, updateUserInfo);

// Reset Password - POST
userRouter.post("/user/reset-password", authMiddleware, resetPassword);

// Update Password - POST
userRouter.post("/user/update-password", authMiddleware, updatePassword);

export default userRouter;
