import {Schema, model} from "mongoose";

// Schema
const orderSchema = new Schema(
  {
    food: [
      {
        type: Schema.Types.ObjectId,
        ref: "Food",
      },
    ],
    payment: {},
    buyer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "preparing",
      enum: ["preparing", "prepared", "delivered", "on the way", "delivered"],
    },
  },
  { timestamps: true }
);

// Export the model
export const OrderModel = model("Order", orderSchema);
