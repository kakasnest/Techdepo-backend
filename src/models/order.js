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
    products: [{ type: Schema.Types.ObjectId, ref: "Product", required: true }],
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
