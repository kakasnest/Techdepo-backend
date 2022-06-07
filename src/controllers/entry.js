import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/user.js";

export const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const {
    env: { TOKEN_SECRET: secret, NODE_ENV: env },
  } = process;

  try {
    const user = await User.findOne({ email: email }).select("+password");

    if (!user) {
      res.status(500).json({ message: "There isn't a user with such a email" });
    } else {
      const match = await compare(password, user.password);
      if (!match) {
        res.status(500).json({ message: "Wrong password" });
      } else {
        const token = jwt.sign({ userId: user._id }, secret, {
          expiresIn: "7d",
        });
        const isSecure = env === "PRODUCTION";
        res.cookie("auth", token, { httpOnly: true, secure: isSecure });
        res.status(200).json({ message: "Login successful" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const register = async (req, res) => {
  const {
    body: { email, password },
  } = req;

  try {
    const user = await User.findOne({ email: email });

    if (user) {
      res.status(500).json({ message: "Email already in use" });
    } else {
      const hashed = await hash(password, 10);
      await User.create({ email, password: hashed });
      res.status(201).json({ message: "Registration complete" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("auth");
    res
      .status(200)
      .json({ message: "Auth cookie has been cleared from the browser" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
