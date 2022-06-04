import Address from "../models/address.js";

export const getAddressById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const address = await Address.findById(id).select([
      "-createdAt",
      "-updatedAt",
      "-__v",
    ]);
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAddressesByUserId = async (req, res) => {
  const {
    body: { pageNumber },
    userId,
  } = req;

  try {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      const addresses = await Address.find({ userId })
        .select(["name"])
        .sort({ _id: 1 })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
        .limit(10);
      res.status(200).json(addresses);
    } else {
      res.status(500).json({
        message: "The pageNumber must be an integer greater than zero",
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

// export const updateAddress = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const {
//     body: { name, country, city, street, houseNumber, postcode, phone },
//   } = req;

//   try {
//     await Address.findByIdAndUpdate(id, {
//       name,
//       country,
//       city,
//       street,
//       houseNumber,
//       postcode,
//       phone,
//     });
//     res.status(200).json({ message: "Address updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
