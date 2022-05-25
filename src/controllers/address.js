import Address from "../models/address.js";

export const getAddress = async (req, res) => {
  const id = req.params.id;

  try {
    const address = await Address.findById(id);
    res.status(200).json(address);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAddresses = async (req, res) => {
  try {
    const addresses = await Address.find();
    res.status(200).json(addresses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createAddress = async (req, res) => {
  const address = req.body.address;

  try {
    await Address.create(address);
    res.status(200).json({ message: "Address created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  const id = req.params.id;

  try {
    await Address.findByIdAndDelete(id);
    res.status(200).json({ message: "Address deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  const id = req.params.id;
  const address = req.body.address;

  try {
    await Address.findByIdAndUpdate(id, address);
    res.status(200).json({ message: "Address updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
