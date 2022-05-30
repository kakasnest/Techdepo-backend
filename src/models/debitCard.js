import mongoose from "mongoose";

const { Schema } = mongoose;
const debitCardSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    expDate: {
      type: Date,
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

debitCardSchema.set("toJSON", { virtuals: true });

const DebitCard = mongoose.model("DebitCard", debitCardSchema);

export default DebitCard;
