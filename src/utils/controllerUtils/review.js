import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Review from "../../models/review.js";

export const reviewExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    const reviewExists = isValidId
      ? null !== (await Review.exists({ _id: id }))
      : false;

    return reviewExists;
  } catch (err) {
    console.log(err.message);
  }
};

export const hasUpdateProps = ({ text, rating }) => {
  return typeof text !== "undefined" && rating !== "undefined";
};
