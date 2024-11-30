import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log(`Connected to Database ${mongoose.connection.host}`);
  } catch (error) {
    console.log("DB Error")
  }
};