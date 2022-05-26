import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: true,
    },
    lastName: {
      type: String,
      trim: true,
      required: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      select: false,
      type: String,
      trim: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      select: false,
    },
    image: {
      type: String,
      trim: true,
      default: "/images/default.png",
    },
  },
  {
    collection: "users",
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
