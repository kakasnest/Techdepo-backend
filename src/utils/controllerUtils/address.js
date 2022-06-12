import mongoose from "mongoose";
const {
  Types: { ObjectId },
} = mongoose;

import Address from "../../models/address.js";

export const hasUpdateProps = ({
  name,
  city,
  country,
  street,
  houseNumber,
  postCode,
  phone,
}) => {
  return (
    typeof name !== "undefined" ||
    typeof city !== "undefined" ||
    typeof country !== "undefined" ||
    typeof street !== "undefined" ||
    typeof houseNumber !== "undefined" ||
    typeof postCode !== "undefined" ||
    typeof phone !== "undefined"
  );
};

export const addressExists = async (id) => {
  const isValidId = ObjectId.isValid(id);
  try {
    return isValidId ? null !== (await Address.exists({ _id: id })) : false;
  } catch (err) {
    console.log(err.message);
  }
};
