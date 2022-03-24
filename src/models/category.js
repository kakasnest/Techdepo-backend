import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: String,
  },
  {
    collection: "categories",
  }
);

const Category = mongoose.model("Category", categorySchema);

export default Category;
