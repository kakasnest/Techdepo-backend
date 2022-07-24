import mongoose from "mongoose";
import Category from "../../models/category.js";
import Product from "../../models/product.js";

const { ObjectId } = mongoose.Types;

export const productRating = (id) => {
  return [
    {
      $facet: {
        rating: [
          { $match: { productId: ObjectId(id) } },
          {
            $group: { _id: "$productId", rating: { $avg: "$rating" } },
          },
        ],
        numberOfRatings: [
          { $match: { productId: ObjectId(id) } },
          {
            $count: "numberOfRatings",
          },
        ],
      },
    },
    {
      $unwind: "$rating",
    },
    {
      $unwind: "$numberOfRatings",
    },
    {
      $project: {
        rating: "$rating.rating",
        numberOfRatings: "$numberOfRatings.numberOfRatings",
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
