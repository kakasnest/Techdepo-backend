import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";
import Product from "../models/product.js";
import { hasPaginationParams } from "../utils/controllerUtils/general.js";
import { orderExists, orderLines } from "../utils/controllerUtils/order.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    if (await orderExists(id)) {
      const order = await Order.findById(id).select(["state", "userId"]);
      const lines = await OrderLine.aggregate(orderLines(id));
      res.status(200).json({ ...order.toObject(), id: order._id, lines });
    } else {
      throw new Error("There isn't an order with this id");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const {
    userId,
    query: { page, limit },
  } = req;

  try {
    if (hasPaginationParams({ page, limit })) {
      const orders = await Order.find({ userId })
        .select(["state", "createdAt"])
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const lines = await OrderLine.aggregate(orderLines(order._id));
        orders[i] = { order, lines };
      }
      res.status(200).json(orders);
    } else {
      throw new Error(
        "The page and limit parameters must be integers greater than zero"
      );
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
        const orderLinesWithOrderId = [];
        // const orderLinesWithOrderId = orderLines.map(async (orderLine) => {
        //   try {
        //     const { productId, quantity } = orderLine;
        //     throw new Error("asd");
        //     const quantityCondition =
        //       quantity && Number.isInteger(quantity) && quantity > 0;
        //     if (isValidObjectId(productId) && quantityCondition) {
        //       const isValidProductId = await Product.exists({ _id: productId });
        //       if (
        //         isValidProductId &&
        //         !orderLinesWithOrderId.some((o) => o.productId === productId)
        //       ) {
        //         return { productId, quantity, orderId };
        //       }
        //       if (
        //         isValidProductId &&
        //         orderLinesWithOrderId.some((o) => o.productId === productId)
        //       ) {
        //         const index = orderLinesWithOrderId.findIndex(
        //           (o) => o.productId === productId
        //         );
        //         const removed = orderLinesWithOrderId.slice(index, 1)[0];
        //         const newLine = {
        //           ...removed,
        //           quantity: quantity + removed.quantity,
        //         };
        //         return newLine;
        //       }
        //       return;
        //     }
        //   } catch (error) {
        //     console.log(error);
        //     return next(error);
        //   }
        // });
        for (let i = 0; i < orderLines.length; i++) {
          const { productId, quantity } = orderLines[i];
          const quantityCondition =
            quantity && Number.isInteger(quantity) && quantity > 0;
          if (quantityCondition) {
            const isValidProductId = await Product.exists({ _id: productId });
            if (
              isValidProductId &&
              !orderLinesWithOrderId.some((o) => o.productId === productId)
            ) {
              orderLinesWithOrderId.push({ productId, quantity, orderId });
            } else if (
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
              orderLinesWithOrderId.push(newLine);
            }
          }
        }

        if (orderLinesWithOrderId.length > 0) {
          await OrderLine.insertMany(orderLinesWithOrderId);
          res.status(200).json({ message: "Order created" });
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
      res.status(500).json({ message: err.message });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
