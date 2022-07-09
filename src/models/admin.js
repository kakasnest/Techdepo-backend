import mongoose from "mongoose";
import { profilePlaceholderPath } from "../utils/database_related/defaultPathsForImages";

const { Schema } = mongoose;
const adminSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "Username is required"],
    },
    password: {
      select: false,
      type: String,
      trim: true,
      required: [true, "Password is required"],
    },
    image: {
      type: String,
      default: profilePlaceholderPath,
    },
  },
  {
    collection: "admins",
    timestamps: true,
  }
);

adminSchema.set("toJSON", { virtuals: true });

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;
