import mongoose from "mongoose";

const { Schema } = mongoose;
const addressSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User must be logged in to create an address"],
      ref: "User",
      index: true,
    },
    name: {
      type: String,
      trim: true,
      required: [true, "Name of address is required"],
    },
    country: {
      type: String,
      trim: true,
      required: [true, "Country of address is required"],
    },
    city: {
      type: String,
      trim: true,
      required: [true, "City of address is required"],
    },
    street: {
      type: String,
      trim: true,
      required: [true, "Street of address is required"],
    },
    houseNumber: {
      type: String,
      trim: true,
      required: [true, "House number of address is required"],
    },
    postcode: {
      type: String,
      trim: true,
      required: [true, "Postcode of address is required"],
    },
    phone: {
      type: String,
      trim: true,
      required: [
        true,
        "The phone number of a contact at the address is required",
      ],
    },
  },
  {
    collection: "addresses",
  }
);

const Address = mongoose.model("Address", addressSchema);

export default Address;
