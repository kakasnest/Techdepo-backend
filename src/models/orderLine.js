import mongoose from "mongoose";

const { Schema } = mongoose;
const orderLineSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v > 0;
        },
        message: "Quantity must be a positive integer",
      },
      required: true,
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
    },
  },
  {
    collection: "orderLines",
    timestamps: true,
  }
);

orderLineSchema.set("toJSON", { virtuals: true });

const OrderLine = mongoose.model("OrderLine", orderLineSchema);

export default OrderLine;
