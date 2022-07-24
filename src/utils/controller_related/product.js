import mongoose from "mongoose";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

const { ObjectId } = mongoose.Types;

export const productRating = (id) => {
  return [
    { $match: { productId: ObjectId(id) } },
    {
      $group: {
        _id: "$productId",
        rating: { $avg: "$rating" },
        numberOfRatings: { $sum: 1 },
      },
    },
    {
      $project: {
        rating: 1,
        numberOfRatings: 1,
        _id: 0,
      },
    },
  ];
};

export const isProductAvailable = async (productId) => {
  const product = await Product.exists({ _id: productId, isActive: true });
  if (product === null) return false;

  return true;
};

export const isStockValid = (stock) => {
  Number.isInteger(stock) && stock >= 0 && Number.isFinite(stock);
};

export const isPriceValid = (price) => {
  return price >= 0 && typeof price === "number" && Number.isFinite(price);
};

export const areCategoriesValid = async (categories) => {
  for (let i = 0; i < categories.length; i++) {
    const category = await Category.exists({ _id: categories[i] });
    if (category === null) return false;
  }
  return true;
};
