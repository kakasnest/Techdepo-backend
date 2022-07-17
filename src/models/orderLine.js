import mongoose from "mongoose";
import { isQuantityValid } from "../utils/controller_related/order.js";
import { isProductAvailable } from "../utils/controller_related/product.js";

const { Schema } = mongoose;
const orderLineSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      validate: {
        validator: isProductAvailable,
        message: "A valid productId is required in each order line",
      },
      required: [true, "A valid productId is required in each order line"],
    },
    quantity: {
      type: Number,
      validate: {
        validator: isQuantityValid,

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

const OrderLine = mongoose.model("OrderLine", orderLineSchema);

export default OrderLine;
