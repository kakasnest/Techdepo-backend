import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const login = async (req, res) => {
  const user = req.body.user;
  const secret = process.env.TOKEN_SECRET;

  try {
    const isValidUser = await User.findOne({ email: user.email }).select(
      "+password"
    );

    if (!isValidUser) {
      res.status(500).json({ message: "There isn't a user with such a email" });
    } else {
      const match = await bcrypt.compare(user.password, isValidUser.password);
      if (!match) {
        res.status(500).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "7d",
        });
        const isSecure = process.env.NODE_ENV === "Production";
        res.cookie("access token", token, { httpOnly: true, secure: isSecure });
        res.status(202).json({ message: "Login successful" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  const user = req.body.user;

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
