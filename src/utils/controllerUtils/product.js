import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Product from "../../models/product.js";

export const productExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Product.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};

export const productRating = (id) => {
  return [
    {
      $facet: {
        rating: [
          { $match: { productId: ObjectId(id) } },
          {
            $group: { _id: "$productId", ratingAvg: { $avg: "$rating" } },
          },
        ],
        ratingCount: [
          { $match: { productId: ObjectId(id) } },
          {
            $count: "ratingCount",
          },
        ],
      },
    },
    {
      $unwind: "$rating",
    },
    {
      $unwind: "$ratingCount",
    },
    {
      $project: {
        rating: "$rating.ratingAvg",
        ratingCount: "$ratingCount.ratingCount",
      },
    },
  ];
};
