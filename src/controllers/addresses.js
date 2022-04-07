import Address from "../models/address.js";

export const addAddress = async (req, res) => {
  const {
    body: { address },
  } = req;

  try {
    const addressToCreate = await Address.create(address);
    res.status(200).json(addressToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAddress = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const addressToGet = await Address.findById(id);
    res.status(200).json(addressToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAddresss = async (req, res) => {
  try {
    const addresss = await Address.find();
    res.status(200).json(addresss);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const addressToDelete = await Address.findByIdAndDelete(id);
    res.status(200).json(addressToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  const {
    params: { id },
    body: { address },
  } = req;

  try {
    const addressToUpdate = await Address.findByIdAndUpdate(id, address, {
      new: true,
    });
    res.status(200).json(addressToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
