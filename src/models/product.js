import mongoose from "mongoose";

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    name: String,
    description: Object,
    review_count: Number,
    review_rating: Number,
    images: Array,
    price: Number,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    stock: Number,
    reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  },
  {
    collection: "products",
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
