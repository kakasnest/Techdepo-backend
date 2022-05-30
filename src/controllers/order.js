import Order from "../models/order.js";
import OrderLine from "../models/orderLine.js";

export const getOrderById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const order = await Order.findById(id);
    const orderLines = await OrderLine.find({ orderId: id });
    res.status(200).json({ order, orderLines });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrdersByUserId = async (req, res) => {
  const { userId } = req;

  try {
    const orders = await Order.find({ userId });
    const orderLines = [];
    for (let i = 0; i < orders.length; i++) {
      const orderId = orders[i].id;
      const orderLinesByOrder = await OrderLine.find({ orderId });
      orderLines.push(orderLinesByOrder);
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
