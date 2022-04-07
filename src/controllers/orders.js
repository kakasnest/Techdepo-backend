import Order from "../models/order.js";

export const addOrder = async (req, res) => {
  const {
    body: { order },
  } = req;

  try {
    const orderToCreate = await Order.create(order);
    res.status(200).json(orderToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrder = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const orderToGet = await Order.findById(id).populate(["products"]);
    res.status(200).json(orderToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate(["products"]);
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const orderToDelete = await Order.findByIdAndDelete(id);
    res.status(200).json(orderToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const {
    params: { id },
    body: { order },
  } = req;

  try {
    const orderToUpdate = await Order.findByIdAndUpdate(id, order, {
      new: true,
    }).populate(["products"]);
    res.status(200).json(orderToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
