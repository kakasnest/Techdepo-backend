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
          "product.id": "$product._id",
          _id: 0,
          totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
        },
      },
    ]);
    res.status(200).json({ ...order.toObject(), id: order._id, orderLines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const {
    body: { pageNumber },
    userId,
  } = req;

  try {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      const orders = await Order.find({ userId })
        .select(["state", "createdAt"])
        .sort({ _id: 1 })
        .skip((pageNumber - 1) * 10)
        .limit(10);
      const orderLinesData = [];
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
              "product.id": "$product._id",
              orderId: 1,
              _id: 0,
              totalPerProduct: { $multiply: ["$product.price", "$quantity"] },
            },
          },
        ]);
        orderLinesData.push(...orderLinesByOrder);
      }
      const response = orders.map((o) => {
        const orderLines = orderLinesData.filter((l) => {
          return l.orderId.toString() === o.id;
        });
        return { ...o.toObject(), id: o._id, orderLines };
      });
      res.status(200).json(response);
    } else {
      res.status(500).json({
        message: "The pageNumber must be an integer greater than zero",
      });
    }
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
      if (orderLines && Array.isArray(orderLines) && orderLines.length > 0) {
        const orderLinesWithOrderId = [];
        for (let i = 0; i < orderLines.length; i++) {
          const { productId, quantity } = orderLines[i];
          orderLinesWithOrderId.push({ productId, quantity, orderId });
        }
        await OrderLine.insertMany(orderLinesWithOrderId);
        res.status(200).json({ message: "Order created" });
      } else {
        res.status(500).json({
          message:
            "Field orderLines is required and must be an array of objects containing productIds and quantities",
        });
      }
    } catch (err) {
      await Order.findByIdAndDelete(orderId);
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
