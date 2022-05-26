import mongoose from "mongoose";

const { Schema } = mongoose;
const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    country: {
      type: String,
      trim: true,
      required: true,
    },
    city: {
      type: String,
      trim: true,
      required: true,
    },
    street: {
      type: String,
      trim: true,
      required: true,
    },
    houseNumber: {
      type: String,
      trim: true,
      required: true,
    },
    postcode: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
  },
  {
    collection: "addresses",
    timestamps: true,
  }
);

addressSchema.set("toJSON", { virtuals: true });

const Address = mongoose.model("Address", addressSchema);

export default Address;
