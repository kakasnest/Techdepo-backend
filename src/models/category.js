import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
