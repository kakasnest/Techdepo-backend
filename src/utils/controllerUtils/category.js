import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Category from "../../models/category.js";

export const categoryExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Category.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};
