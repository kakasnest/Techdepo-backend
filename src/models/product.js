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
      default: "",
    },
    images: {
      type: [String],
      default: ["/api/images/default/placeholder.png"],
    },
    stock: {
      type: Number,
      validate: {
        validator: Number.isInteger,
        message: "{VALUE} is not an integer",
      },
      default: 0,
    },
    price: {
      type: Number,
      default: 9999,
    },
    categories: [
      { type: Schema.Types.ObjectId, ref: "Category", required: true },
    ],
    isActive: {
      type: Boolean,
      default: false,
      select: false,
    },
  },
  {
    collection: "products",
    timestamps: true,
  }
);

productSchema.set("toJSON", { virtuals: true });

const Product = mongoose.model("Product", productSchema);

export default Product;
