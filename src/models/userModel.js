import { Schema, model } from "mongoose";

// User Schema
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: Array,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: "client",
      enum: ["client", "admin", "vendor", "delivery"],
    },
    profileImage: {
      type: String,
      default:
        "https://www.google.com/url?sa=i&url=https%3A%2F%2Fpixabay.com%2Fimages%2Fsearch%2Fuser%2F&psig=AOvVaw2MAeYrdIVgAmqj23GbCuM-&ust=1733045107600000&source=images&cd=vfe&opi=89978449&ved=2ahUKEwjWlbWh3oOKAxW-TUEAHTfsC6kQjRx6BAgAEBk",
        },
    answer: {
        type: String,
        required: [true, "Please provide an answer"],
      },
  },
  { timestamps: true }
);

// Model
export const UserModel = model("User", userSchema);