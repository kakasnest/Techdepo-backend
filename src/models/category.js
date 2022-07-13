import mongoose from "mongoose";
import { generalPlaceholderPath } from "../utils/database_related/defaultImagePaths.js";

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name of category is required"],
      unique: true,
    },
    image: {
      type: String,
      default: generalPlaceholderPath,
    },
  },
  {
    collection: "categories",
  }
);

categorySchema.set("toJSON", { virtuals: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
