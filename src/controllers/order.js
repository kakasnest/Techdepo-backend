import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";
import { checkPaginationParams } from "../utils/controller_related/general.js";
import { orderLinesByOrderId } from "../utils/controller_related/order.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const order = await Order.findById(id).select(["state", "userId"]);
    const lines = await OrderLine.aggregate(orderLinesByOrderId(id));
    res.status(200).json({ ...order.toObject(), id: order._id, lines });
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
    if (checkPaginationParams(page, limit)) {
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
    const lines = [];
    const { id: orderId } = await Order.create({ userId });
    for (let i = 0; i < orderLines.length; i++) {
      lines[i] = { ...orderLines[i], orderId };
    }
    await OrderLine.insertMany(lines);
    res.status(200).json({ message: "Order created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
