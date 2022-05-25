import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    images: [{ type: String, trim: true }],
    stock: Number,
    price: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    collection: "products",
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
