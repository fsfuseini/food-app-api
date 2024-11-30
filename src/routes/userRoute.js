import { Router } from "express";
import { registerUser, loginUser, getUserInfo, updateUserInfo } from "../conttrollers/userController.js";
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




export default userRouter;