import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const orderToGet = await Order.findById(id);
    res.status(200).json(orderToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req;

  try {
    const orders = await Order.find({ userId });
    res.status(200).json(orders);
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
    for (let i = 0; i < orderLines.length; i++) {
      const { productId, quantity } = orderLines[i];
      await OrderLine.create({ productId, quantity, orderId });
    }
    res.status(200).json({ message: "Order created" });
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
