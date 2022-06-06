import mongoose from "mongoose";
const { ObjectId } = mongoose.Types;

export const isValidObjectId = (id) => {
  if (ObjectId.isValid(id) && String(new ObjectId(id)) === id) return true;
  return false;
};
