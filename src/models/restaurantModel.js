import { model, Schema } from "mongoose";

const restaurantSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    foods: { type: Array },
    time: { type: String },
    pickup: { type: Boolean, default: true },
    delivery: { type: Boolean, default: true },
    isOpen: { type: Boolean, default: true },
    logoUrl: { type: String },
    rating: { type: Number, default: 1, min: 1, max: 5 },
    ratingCount: { type: String },
    code: { type: String },
        coords: {
            id: { type: String },
            latitude: { type: Number },
            latitudeDelta: { type: Number },
            longitude: { type: Number },
            longitudeDelta: { type: Number },
            address: { type: String },
            title: {type:String}
        },
  },
  { timestamps: true }
);

// Export mode
export const RestaurantModel = model("Restaurant", restaurantSchema);
