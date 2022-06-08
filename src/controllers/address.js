import Address from "../models/address.js";

export const getAddressesByUserId = async (req, res) => {
  const { userId, query } = req;
  const page = parseInt(query.page);
  const limit = parseInt(query.limit);
  const pageCondition = page && Number.isInteger(page) && page > 0;
  const limitCondition =
    limit && Number.isInteger(limit) && limit > 0 && limit <= 100;

  try {
    if (pageCondition && limitCondition) {
      const addresses = await Address.find({ userId })
        .select(["-createdAt", "-updatedAt", "-__v", "-userId"])
        .sort({ _id: 1 })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(addresses);
    } else {
      res.status(500).json({
        message:
          "The page and limit parameters must be integer convertable strings greater than zero",
      });
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
    await Address.create({
      name,
      country,
      city,
      street,
      postcode,
      houseNumber,
      phone,
      userId,
    });
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
  } = req;
  const {
    body: { name, country, city, street, houseNumber, postcode, phone },
  } = req;
  const addressCondition =
    name || country || city || street || houseNumber || postcode || phone;

  try {
    if (addressCondition) {
      await Address.findByIdAndUpdate(id, {
        name,
        country,
        city,
        street,
        houseNumber,
        postcode,
        phone,
      });
      res.status(200).json({ message: "Address updated" });
    } else {
      res.status(500).json({ message: "No data provided for address update" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
