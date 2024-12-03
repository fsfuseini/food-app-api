import { Schema, model } from "mongoose";

// Schema
const categorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      default:
        "https://png.pngtree.com/png-vector/20220705/ourmid/pngtree-food-logo-png-image_5687686.png",
    },
  },
  { timestamps: true }
);

export const CategoryModel = model("Category", categorySchema);
