import mongoose from "mongoose";

const { Schema } = mongoose;
const categorySchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    image: {
      type: String,
      default: "/api/images/default/placeholder.png",
    },
  },
  {
    collection: "categories",
    timestamps: true,
  }
);

categorySchema.set("toJSON", { virtuals: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
