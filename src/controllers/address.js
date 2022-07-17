import Address from "../models/address.js";
import { checkPaginationParams } from "../utils/controller_related/general.js";

export const getAddressesByUserId = async (req, res) => {
  const {
    userId,
    query: { page, limit },
  } = req;

  try {
    if (checkPaginationParams(page, limit)) {
      const addresses = await Address.find({ userId })
        .select(["-__v", "-userId"])
        .sort({ name: 1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean();
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
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted" });
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
    await Address.findByIdAndUpdate(id, address, { runValidators: true });
    res.status(200).json({ message: "Address updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
