import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product", // Reference to the Product model
      },
    ],
  },
  { timestamps: true }
);

export const Wishlist = mongoose.model("Wishlist", wishlistSchema);
