import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/admin.js";

import User from "../models/user.js";

export const login = async (req, res) => {
  const {
    body: { email, password },
  } = req;
  const {
    env: { TOKEN_SECRET: secret, NODE_ENV: env },
  } = process;

  try {
    const user = await User.findOne({ email }).select("+password").lean();
    if (!user) {
      throw new Error("There isn't a user with such an email");
    } else {
      const match = await compare(password, user.password);
      if (!match) {
        throw new Error("Wrong password");
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
    const user = await User.findOne({ email }).lean();
    if (user) {
      throw new Error("Email already in use");
    } else {
      const hashed = await hash(password, 10);
      await User.create({ email, password: hashed });
      res.status(200).json({ message: "Registration complete" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("auth");
    res.status(200).json({
      message: "Cookie has been cleared from the browser",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminRegister = async (req, res) => {
  const {
    body: { username, password },
  } = req;

  try {
    const admin = await Admin.findOne({ username }).login();
    if (admin) {
      throw new Error("Username already exists");
    } else {
      const hashed = await hash(password, 10);
      await Admin.create({ username, password: hashed });
      res.status(200).json({ message: "Registration complete" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminLogin = async (req, res) => {
  const {
    body: { username, password },
  } = req;
  const {
    env: { TOKEN_SECRET: secret, NODE_ENV: env },
  } = process;

  try {
    const admin = await Admin.findOne({ username }).select("+password").lean();
    if (!admin) {
      throw new Error("There isn't an administrator with such a username");
    } else {
      const match = await compare(password, admin.password);
      if (!match) {
        throw new Error("Wrong password");
      } else {
        const token = jwt.sign({ adminId: admin._id }, secret, {
          expiresIn: "7d",
        });
        const isSecure = env === "PRODUCTION";
        res.cookie("adminAuth", token, { httpOnly: true, secure: isSecure });
        res.status(200).json({ message: "Login successful" });
      }
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("adminAuth");
    res.status(200).json({
      message: "Cookie has been cleared from the browser",
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
