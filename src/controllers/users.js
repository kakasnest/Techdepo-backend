import { User } from "../models/index.js";

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userToGet = await User.findById(id).populate([
      "orders",
      "addresses",
      "debitCards",
    ]);
    res.status(200).json(userToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find().populate([
      "addresses",
      "debitCards",
      "orders",
    ]);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userToDelete = await User.findByIdAndDelete(id);
    res.status(200).json(userToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body.user;

  try {
    const userToUpdate = await User.findByIdAndUpdate(id, user, {
      new: true,
    }).populate(["orders", "addresses", "debitCards"]);
    res.status(200).json(userToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
