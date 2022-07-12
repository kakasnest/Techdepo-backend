export const orderLinesByOrderId = (id) => {
  return [
    { $match: { orderId: ObjectId(id) } },
    {
      $lookup: {
        from: "products",
        localField: "productId",
        foreignField: "_id",
        as: "product",
      },
    },
    {
      $unwind: "$product",
    },
    {
      $project: {
        quantity: 1,
        "product.price": 1,
        "product.thumbnail": 1,
        "product.name": 1,
        "product.id": "$product._id",
        _id: 0,
        totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
      },
    },
  ];
};
