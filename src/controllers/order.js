import Order from "../models/order.js";

export const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const orderToGet = await Order.findById(id);
    res.status(200).json(orderToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createOrder = async (req, res) => {
  const order = req.body.order;

  try {
    await Order.create(order);
    res.status(200).json({ message: "Order created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    await Order.findByIdAndDelete(id);
    res.status(200).json({ message: "Order deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body.order;

  try {
    await Order.findByIdAndUpdate(id, order);
    res.status(200).json({ message: "Order updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
