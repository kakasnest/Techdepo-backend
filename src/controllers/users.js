import User from "../models/user.js";

export const addUser = async (req, res) => {
  const {
    body: { user },
  } = req;

  try {
    const userToCreate = await User.create(user);
    res.status(200).json(userToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
