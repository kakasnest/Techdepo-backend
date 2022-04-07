import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    description: {
      brand: {
        type: String,
        trim: true,
      },
    },
    images: [{ type: String, trim: true }],
    currency: {
      type: String,
      enum: ["HUF", "EUR", "US"],
      uppercase: true,
    },
    stock: Number,
    price: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
