import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
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
      minlength: 8,
      maxlength: 20,
    },
    role: {
      type: String,
      enum: ["ADMIN", "MODERATOR", "USER"],
      default: "USER",
      uppercase: true,
    },
    picture: {
      type: String,
      trim: true,
      default: "",
    },
    registeredAt: {
      type: Date,
      default: new Date(),
      select: false,
    },
    addresses: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    orders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    debitCards: [{ type: Schema.Types.ObjectId, ref: "DebitCard" }],
  },
  {
    collection: "users",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
