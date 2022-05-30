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
        validator: Number.isInteger,
        message: "{VALUE} is not an integer",
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
