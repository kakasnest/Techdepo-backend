import mongoose from "mongoose";

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
      default: "/api/images/default/default/profile.png",
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
