import { Schema, model } from "mongoose";

const foodSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
        },
    description: {
      type: String, required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png",
    },
    foodTags: {
        type: String,
    },
    category: {
      type: String,
        },
    code: {
      type: String,
        },
    isAvailable: {
      type: Boolean,
      default: true,
        },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
        },
    rating: {
      type: Number,
      default: 1,
      min: 1,
      max: 5,
        },
    ratingCount: {
      type: String,
    },
  },
  { timestamps: true }
);

export const FoodModel = model("Food", foodSchema);
