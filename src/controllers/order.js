import mongoose from "mongoose";

import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";
import Product from "../models/product.js";

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
  const { userId, query } = req;
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const pageCondition = page && Number.isInteger(page) && page > 0;
  const limitCondition =
    limit && Number.isInteger(limit) && limit > 0 && limit <= 100;

  try {
    if (pageCondition && limitCondition) {
      const orders = await Order.find({ userId })
        .select(["state", "createdAt"])
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
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
        message:
          "The page and limit parameters must be integer convertable strings greater than zero",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrder = async (req, res, next) => {
  const {
    body: { orderLines },
    userId,
  } = req;
  const orderLinesCondition =
    orderLines && Array.isArray(orderLines) && orderLines.length > 0;

  try {
    const { id: orderId } = await Order.create({ userId });
    try {
      if (orderLinesCondition) {
        const orderLinesWithOrderId = orderLines.map(async (orderLine) => {
          try {
            const { productId, quantity } = orderLine;
            throw new Error("asd");
            const quantityCondition =
              quantity && Number.isInteger(quantity) && quantity > 0;
            if (isValidObjectId(productId) && quantityCondition) {
              const isValidProductId = await Product.exists({ _id: productId });
              if (
                isValidProductId &&
                !orderLinesWithOrderId.some((o) => o.productId === productId)
              ) {
                return { productId, quantity, orderId };
              }
              if (
                isValidProductId &&
                orderLinesWithOrderId.some((o) => o.productId === productId)
              ) {
                const index = orderLinesWithOrderId.findIndex(
                  (o) => o.productId === productId
                );
                const removed = orderLinesWithOrderId.slice(index, 1)[0];
                const newLine = {
                  ...removed,
                  quantity: quantity + removed.quantity,
                };
                return newLine;
              }
              return;
            }
          } catch (error) {
            console.log(error);
            return next(error);
          }
        });
        // for (let i = 0; i < orderLines.length; i++) {
        //   const { productId, quantity } = orderLines[i];
        //   const quantityCondition =
        //     quantity && Number.isInteger(quantity) && quantity > 0;
        //   if (isValidObjectId(productId) && quantityCondition) {
        //     const isValidProductId = await Product.exists({ _id: productId });
        //     if (
        //       isValidProductId &&
        //       !orderLinesWithOrderId.some((o) => o.productId === productId)
        //     ) {
        //       orderLinesWithOrderId.push({ productId, quantity, orderId });
        //     } else if (
        //       isValidProductId &&
        //       orderLinesWithOrderId.some((o) => o.productId === productId)
        //     ) {
        //       const index = orderLinesWithOrderId.findIndex(
        //         (o) => o.productId === productId
        //       );
        //       const removed = orderLinesWithOrderId.slice(index, 1)[0];
        //       const newLine = {
        //         ...removed,
        //         quantity: quantity + removed.quantity,
        //       };
        //       orderLinesWithOrderId.push(newLine);
        //     }
        //   }
        // }

        if (orderLinesWithOrderId.length > 0) {
          await OrderLine.insertMany(orderLinesWithOrderId);
          res.status(201).json({ message: "Order created" });
        } else {
          res.status(500).json({
            message: "OrderLines must contain valid productIds and quantities",
          });
        }
      } else {
        res.status(500).json({
          message:
            "Field orderLines is required and must be an array of objects containing productIds and quantities",
        });
      }
    } catch (err) {
      await Order.findByIdAndDelete(orderId);
      next(err.message);
    }
  } catch (err) {
    next(err.message);
  }
};
