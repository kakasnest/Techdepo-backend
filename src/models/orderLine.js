import mongoose from "mongoose";

const { Schema } = mongoose;
const orderLineSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [
        true,
        "At least one ProductId is required to create valid order",
      ],
    },
    quantity: {
      type: Number,
      validate: {
        validator: function (v) {
          return Number.isInteger(v) && v > 0;
        },
        message:
          "Quantity of the ordered product must be a positive integer greater than zero",
      },
      required: [true, "Quantity of the ordered product is required"],
    },
    orderId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Order",
      index: true,
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
