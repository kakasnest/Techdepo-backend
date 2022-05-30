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
          return Number.isInteger(v) && !(v < 0) && !(v > 5);
        },
        message: "Stock must be greater than or equal to zero",
      },
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
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
