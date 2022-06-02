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
  const { userId } = req;

  try {
    const addresses = await Address.find({ userId }).select(["name"]);
    res.status(200).json(addresses);
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
