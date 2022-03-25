import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      firstName: {
        type: String,
        trim: true,
      },
      lastName: {
        type: String,
        trim: true,
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
      enum: ["Admin", "Moderator", "User"],
    },
    picture: {
      type: String,
      trim: true,
    },
    registeredAt: {
      type: Date,
      default: Date.now,
      select: false,
    },
    phone: {
      type: String,
      trim: true,
    },
    addresses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Address" }],
    },
    orders: {
      type: [{ type: Schema.Types.ObjectId, ref: "Order" }],
    },
    debitCards: [{ type: Schema.Types.ObjectId, ref: "DebitCard" }],
  },
  {
    collection: "user",
  }
);

const User = mongoose.model("User", userSchema);

export default User;
