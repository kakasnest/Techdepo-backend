import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    state: {
      type: String,
      enum: ["CREATED", "APPROVED", "SENT", "COMPLETED"],
      default: "CREATED",
      uppercase: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User must be logged in to create an order"],
      ref: "User",
      index: true,
    },
    orderLines: {
      type: [Schema.Types.ObjectId],
      ref: "OrderLine",
      required: [true, "An order requires at least one order line."],
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
