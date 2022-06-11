import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Product from "../../models/product.js";

export const productExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    const reviewExists = isValidId
      ? null !== (await Product.exists({ _id: id }))
      : false;

    return reviewExists;
  } catch (err) {
    console.log(err.message);
  }
};

export const productRating = (id) => {
  return [
    {
      $facet: {
        productRating: [
          { $match: { productId: ObjectId(id) } },
          {
            $group: { _id: "$productId", rating: { $avg: "$rating" } },
          },
        ],
        productRatingCount: [
          { $match: { productId: ObjectId(id) } },
          {
            $count: "ratingCount",
          },
        ],
      },
    },
    {
      $unwind: "$productRating",
    },
    {
      $unwind: "$productRatingCount",
    },
    {
      $addFields: {
        merged: {
          $mergeObjects: ["$productRating", "$productRatingCount"],
        },
      },
    },
    {
      $project: {
        rating: "$merged.rating",
        ratingCount: "$merged.ratingCount",
        id: "$merged._id",
      },
    },
  ];
};
