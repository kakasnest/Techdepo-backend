import Product from "../../models/product.js";

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
