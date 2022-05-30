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
      required: true,
      ref: "User",
    },
  },
  {
    collection: "orders",
    timestamps: true,
  }
);

orderSchema.set("toJSON", { virtuals: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;
