import mongoose from "mongoose";

const { Schema } = mongoose;
const debitCardSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      unique: true,
    },
    expDate: {
      type: String,
      trim: true,
      required: true,
    },
    cardNumber: {
      type: String,
      trim: true,
      required: true,
    },
    cvv: {
      type: String,
      trim: true,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    collection: "debitCards",
    timestamps: true,
  }
);

const DebitCard = mongoose.model("DebitCard", debitCardSchema);

export default DebitCard;
