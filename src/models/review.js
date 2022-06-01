import mongoose from "mongoose";

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
      required: true,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && !(v < 1) && !(v > 5);
        },
        message: "The rating of the review must be an integer between 1 and 5",
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
      required: [
        true,
        "At least one ProductId is required to create a valid review",
      ],
      index: true,
    },
  },
  {
    collection: "reviews",
    timestamps: true,
  }
);

reviewSchema.set("toJSON", { virtuals: true });

const Review = mongoose.model("Review", reviewSchema);

export default Review;
