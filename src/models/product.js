import mongoose from "mongoose";
import {
  areCategoriesValid,
  isPriceValid,
  isStockValid,
} from "../utils/controller_related/product.js";
import { generalPlaceholderPath } from "../utils/database_related/defaultImagePaths.js";

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Name of product is required"],
      unique: true,
    },
    description: {
      type: String,
      trim: true,
      default: "",
    },
    images: {
      type: [String],
      default: [generalPlaceholderPath],
    },
    thumbnail: {
      type: String,
      default: generalPlaceholderPath,
    },
    stock: {
      type: Number,
      validate: {
        validator: isStockValid,
        message:
          "The number of product in stock must be greater than or equal to zero",
      },
      default: 0,
    },
    price: {
      type: Number,
      validate: {
        validator: isPriceValid,
        message: "Price of product must be greater than or equal to zero",
      },
      default: 0,
    },
    categories: {
      type: [Schema.Types.ObjectId],
      ref: "Category",
      default: [],
      validate: {
        validator: areCategoriesValid,
        message: "Valid categories required",
      },
    },
    isActive: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
