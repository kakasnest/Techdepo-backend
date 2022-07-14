import mongoose from "mongoose";
import {
  isProductAvailable,
  isQuantityValid,
} from "../utils/controller_related/product.js";

const { Schema } = mongoose;
const orderLineSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      validate: {
        validator: async function (v) {
          return await isProductAvailable(v);
        },
        message: "A valid productId is required in each order line",
      },
      required: [true, "A valid productId is required in each order line"],
    },
    quantity: {
      type: Number,
      validate: {
        validator: function (v) {
          return isQuantityValid(v);
        },
        message:
          "Quantity of the ordered product must be a positive integer greater than zero",
      },
      required: [true, "Quantity of the ordered product is required"],
    },
  },
  {
    collection: "orderLines",
  }
);

orderLineSchema.set("toJSON", { virtuals: true });

const OrderLine = mongoose.model("OrderLine", orderLineSchema);

export default OrderLine;
