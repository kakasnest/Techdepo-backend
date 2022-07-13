import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";
import { checkPaginationParams } from "../utils/controller_related/general.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const order = await Order.findById(id)
      .select(["state", "userId"])
      .populate({
        path: "orderLines",
        model: "OrderLine",
        select: ["quantity", "productId", "createdAt", "updatedAt"],
        populate: {
          path: "productId",
          model: "Product",
          select: ["name", "thumbnail", "price"],
        },
      });
    res.status(200).json(order);
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
        .limit(limit)
        .populate({
          path: "orderLines",
          model: "OrderLine",
          select: ["quantity", "product", "createdAt", "updatedAt"],
          populate: {
            path: "productId",
            model: "Product",
            select: ["name", "thumbnail", "price"],
          },
        });
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
    const lines = await OrderLine.insertMany(orderLines);
    const lineIds = [];
    for (let i = 0; i < lines.length; i++) {
      const { _id } = lines[i];
      lineIds.push(_id);
    }
    await Order.create({ userId, orderLines: lineIds });
    res.status(200).json({ message: "Order created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
