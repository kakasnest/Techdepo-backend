import mongoose from "mongoose";

import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";

const { ObjectId } = mongoose.Types;

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const order = await Order.findById(id).select(["state", "userId"]);
    const orderLines = await OrderLine.aggregate([
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
          totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
        },
      },
    ]);
    res.status(200).json({ order, orderLines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req;

  try {
    const orders = await Order.find({ userId }).select(["state", "createdAt"]);
    const orderLines = [];
    for (let i = 0; i < orders.length; i++) {
      const orderId = orders[i].id;
      const orderLinesByOrder = await OrderLine.aggregate([
        { $match: { orderId: ObjectId(orderId) } },
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
            orderId: 1,
            totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
          },
        },
      ]);
      orderLines.push(...orderLinesByOrder);
    }
    res.status(200).json({ orders, orderLines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  const {
    body: { orderLines },
    userId,
  } = req;

  try {
    const { id: orderId } = await Order.create({ userId });
    try {
      const orderLinesWithOrderId = [];
      for (let i = 0; i < orderLines.length; i++) {
        const { productId, quantity } = orderLines[i];
        orderLinesWithOrderId.push({ productId, quantity, orderId });
      }
      await OrderLine.insertMany(orderLinesWithOrderId);
      res.status(200).json({ message: "Order created" });
    } catch (err) {
      await Order.findByIdAndDelete(orderId);
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const deleteOrder = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Order.findByIdAndDelete(id);
//     res.status(200).json({ message: "Order deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateOrder = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const { body: orderLines, state } = req;

//   try {
//     await Order.findByIdAndUpdate(id, { orderLines, state });
//     res.status(200).json({ message: "Order updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
