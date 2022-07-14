import mongoose from "mongoose";
import { profilePlaceholderPath } from "../utils/database_related/defaultImagePaths.js";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: "",
    },
    lastName: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Email is required"],
    },
    password: {
      select: false,
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    verified: {
      type: Boolean,
      default: false,
      select: false,
    },
    image: {
      type: String,
      default: profilePlaceholderPath,
    },
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
