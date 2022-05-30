import User from "../models/user.js";

export const getUserById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const user = await User.findById(id);
    res.status(200).json(user);
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

// export const deleteUser = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await User.findByIdAndDelete(id);
//     res.status(200).json({ message: "User deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateUser = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const {
//     body: { firstName, lastName, email, password, verified, image },
//   } = req;
//   //TODO: controller for each update possibility?

//   try {
//     await User.findByIdAndUpdate(id, {
//       firstName,
//       lastName,
//       email,
//       password,
//       verified,
//       image,
//     });
//     res.status(200).json({ message: "User updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
