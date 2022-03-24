import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "categories",
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
