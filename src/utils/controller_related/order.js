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

export const hasLines = (orderLines) => {
  return (
    typeof orderLines !== "undefined" &&
    Array.isArray(orderLines) &&
    orderLines.length > 0
  );
};

export const isValidQuantity = (quantity) => {
  return (
    typeof quantity !== undefined && Number.isInteger(quantity) && quantity > 0
  );
};

export const alreadyInLines = (orderLines, productId) => {
  return orderLines.some((e) => e.productId === productId);
};

export const updateLine = (orderLines, productId, additionalQuantity) => {
  const index = orderLines.findIndex((o) => o.productId === productId);
  const { quantity } = orderLines[index];
  orderLines[index] = { productId, quantity: quantity + additionalQuantity };
};
