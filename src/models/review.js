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
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: String,
      default: new Date().toISOString().split("T")[0],
    },
  },
  {
    collection: "reviews",
  }
);

const Review = mongoose.model("Review", reviewSchema);

export default Review;
