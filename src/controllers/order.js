import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";
import { hasPaginationParams } from "../utils/controllerUtils/general.js";
import {
  alreadyInLines,
  hasLines,
  isValidQuantity,
  orderExists,
  orderLinesByOrderId,
  updateLine,
} from "../utils/controllerUtils/order.js";
import { productExists } from "../utils/controllerUtils/product.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    if (await orderExists(id)) {
      const order = await Order.findById(id).select(["state", "userId"]);
      const lines = await OrderLine.aggregate(orderLinesByOrderId(id));
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
    if (hasPaginationParams(page, limit)) {
      const orders = await Order.find({ userId })
        .select(["state", "createdAt"])
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const lines = await OrderLine.aggregate(orderLinesByOrderId(order._id));
        orders[i] = { ...order.toObject(), lines };
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

export const createOrder = async (req, res) => {
  const {
    body: { orderLines },
    userId,
  } = req;

  try {
    if (hasLines(orderLines)) {
      const lines = [];
      for (let i = 0; i < orderLines.length; i++) {
        const { productId, quantity } = orderLines[i];
        if ((await productExists(productId)) && isValidQuantity(quantity)) {
          if (alreadyInLines(lines, productId))
            updateLine(lines, productId, quantity);
          else lines.push({ productId, quantity });
        }
      }
      if (lines.length > 0) {
        const { id: orderId } = await Order.create({ userId });
        for (let i = 0; i < lines.length; i++) {
          const { productId, quantity } = lines[i];
          lines[i] = { productId, quantity, orderId };
        }
        await OrderLine.insertMany(lines);
        res.status(200).json({ message: "Order created" });
      } else {
        throw new Error(
          "OrderLines must contain valid productIds and quantities"
        );
      }
    } else {
      throw new Error(
        "Field orderLines is required and must be an array of objects containing productIds and quantities"
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
