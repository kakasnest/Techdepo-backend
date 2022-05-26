import mongoose from "mongoose";

const { Schema } = mongoose;
const userSchema = new Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    password: {
      select: false,
      type: String,
      trim: true,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
      select: false,
    },
    image: String,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

userSchema.virtual("fullName").get(function () {
  if (this.firstName && this.lastName)
    return this.firstName + " " + this.lastName;
  return "";
});
userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);

export default User;
