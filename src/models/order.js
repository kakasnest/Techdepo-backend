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
    orderLines: [
      {
        product: {
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
      },
    ],
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
