import mongoose from "mongoose";

const { Schema } = mongoose;
const orderSchema = new Schema(
  {
    state: {
      type: String,
      enum: ["created", "approved", "sent", "completed"],
      default: "created",
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User must be logged in to create an order"],
      ref: "User",
      index: true,
    },
    paymentMethod: {
      type: String,
      enum: ["paypal", "cod"],
      required: [true, "An order requires a payment method."],
    },
    shippingAddress: {
      type: Schema.Types.ObjectId,
      required: [true, "An order requires an address for the delivery."],
      ref: "Address",
    },
    billingAddress: {
      type: Schema.Types.ObjectId,
      required: [true, "An order requires an address for the billing."],
      ref: "Address",
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
