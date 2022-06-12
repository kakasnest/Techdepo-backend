import Address from "../models/address.js";
import {
  addressExists,
  hasUpdateProps,
} from "../utils/controllerUtils/address.js";
import { hasPaginationParams } from "../utils/controllerUtils/general.js";

export const getAddressesByUserId = async (req, res) => {
  const {
    userId,
    query: { page, limit },
  } = req;

  try {
    if (hasPaginationParams({ page, limit })) {
      const addresses = await Address.find({ userId })
        .select(["-createdAt", "-updatedAt", "-__v", "-userId"])
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(addresses);
    } else {
      throw new Error(
        "The page and limit parameters must be integers greater than zero"
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAddress = async (req, res) => {
  const {
    body: { name, country, city, street, postcode, houseNumber, phone },
    userId,
  } = req;

  try {
    const address = {
      name,
      country,
      city,
      street,
      postcode,
      houseNumber,
      phone,
      userId,
    };
    await Address.create(address);
    res.status(200).json({ message: "Address created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAddressById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    if (addressExists(id)) {
      await Address.findByIdAndDelete(id);
      res.status(200).json({ message: "Address deleted" });
    } else {
      throw new Error("There isn't an address with this id");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAddressById = async (req, res) => {
  const {
    params: { id },
    body: { name, country, city, street, houseNumber, postcode, phone },
  } = req;

  try {
    const address = {
      name,
      country,
      city,
      street,
      houseNumber,
      postcode,
      phone,
    };
    if (hasUpdateProps(address)) {
      await Address.findByIdAndUpdate(id, address);
      res.status(200).json({ message: "Address updated" });
    } else {
      throw new Error("Address update requires at least one field");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
