import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Order from "../../models/order.js";

export const orderExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Order.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};

export const orderLines = (id) => {
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

export const addLineToOrder = (order) => {};

// TEMP
// const orderLinesData = [];
// [
//     { $match: { orderId: ObjectId(orderId) } },
//     {
//       $lookup: {
//         from: "products",
//         localField: "productId",
//         foreignField: "_id",
//         as: "product",
//       },
//     },
//     {
//       $unwind: "$product",
//     },
//     {
//       $project: {
//         quantity: 1,
//         "product.price": 1,
//         "product.thumbnail": 1,
//         "product.id": "$product._id",
//         orderId: 1,
//         _id: 0,
//         totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
//       },
//     },
//   ]

// orderLinesData.push(...orderLinesByOrder);

// const response = orders.map((o) => {
//     const orderLines = orderLinesData.filter((l) => {
//       return l.orderId.toString() === o.id;
//     });
//     return { ...o.toObject(), id: o._id, orderLines };
//   });
