import User from "../models/user.js";
import bcrypt from "bcrypt";

export const addUser = async (req, res) => {
  const {
    body: { user },
  } = req;

  try {
    const result = await User.findOne({ email: user.email });

    if (result) {
      res.status(500).json({ message: "Email already in use" });
    } else {
      const hashed = await bcrypt.hash(user.password, 10);
      await User.create({ ...user, password: hashed });
      res.status(201).json({ message: "Registration complete" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUser = async (req, res) => {
  const {
    params: { id },
  } = req;

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
  const {
    params: { id },
  } = req;

  try {
    const userToDelete = await User.findByIdAndDelete(id);
    res.status(200).json(userToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const {
    params: { id },
    body: { user },
  } = req;

  try {
    const userToUpdate = await User.findByIdAndUpdate(id, user, {
      new: true,
    }).populate(["orders", "addresses", "debitCards"]);
    res.status(200).json(userToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
