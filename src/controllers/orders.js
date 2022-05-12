import { Order } from "../models/index.js";

export const addOrder = async (req, res) => {
  const order = req.body.order;

  try {
    const orderToCreate = await Order.create(order);
    res.status(200).json(orderToCreate);
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

export const getOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const orderToGet = await Order.findById(id);
    res.status(200).json(orderToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteOrder = async (req, res) => {
  const id = req.params.id;

  try {
    const orderToDelete = await Order.findByIdAndDelete(id);
    res.status(200).json(orderToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateOrder = async (req, res) => {
  const id = req.params.id;
  const order = req.body.order;

  try {
    const orderToUpdate = await Order.findByIdAndUpdate(id, order, {
      new: true,
    }).populate(["products"]);
    res.status(200).json(orderToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
