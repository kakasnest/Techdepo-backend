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
    images: [String],
    stock: Number,
    price: Number,
    categories: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
