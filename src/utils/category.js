import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Category from "../models/category.js";

export const categoryExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Category.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};

export const alreadyInValidCategories = (categories, categoryId) => {
  return categories.some(
    (categoryIdAlreadyIn) => categoryIdAlreadyIn === categoryId
  );
};

export const hasCategories = (categories) => {
  return (
    typeof categories !== "undefined" &&
    typeof categories !== "string" &&
    Array.isArray(categories) &&
    categories.length > 0
  );
};

export const hasOneCategory = (categories) => {
  return typeof categories === "string" && categories.length > 0;
};
