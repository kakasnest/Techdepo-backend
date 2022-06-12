import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Review from "../../models/review.js";

export const reviewExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Review.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};

export const hasUpdateProps = (rating) => {
  return typeof rating !== "undefined";
};
