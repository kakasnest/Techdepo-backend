import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Address from "../models/address.js";

export const addressExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Address.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};
