import mongoose from "mongoose";
import { isProductAvailable } from "../utils/controller_related/product.js";
import { isRatingValid } from "../utils/controller_related/reviews.js";

const { Schema } = mongoose;
const reviewSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      default: "",
    },
    rating: {
      type: Number,
      required: [true, "Rating of the product is required"],
      validate: {
        validator: isRatingValid,
        message: "Rating of the review must be an integer between 1 and 5",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [
        true,
        "User must be logged in to create a review for a product",
      ],
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      validate: {
        validator: isProductAvailable,

        message: "A valid productId is required",
      },
      required: [true, "A valid productId is required"],
      index: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
