import User from "../models/user.js";

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const userToGet = await User.findById(id);
    res.status(200).json(userToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body.user;

  try {
    await User.findByIdAndUpdate(id, user);
    res.status(200).json({ message: "User updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
