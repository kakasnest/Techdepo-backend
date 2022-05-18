import mongoose from "mongoose";

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
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
    picture: {
      type: String,
      trim: true,
      default: "/images/default.png",
    },
  },
  {
    collection: "admins",
    timestamps: true,
  }
);

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
