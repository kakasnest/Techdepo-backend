import { Address } from "../models/index.js";

export const addAddress = async (req, res) => {
  const address = req.body.address;

  try {
    const addressToCreate = await Address.create(address);
    res.status(200).json(addressToCreate);
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

export const getAddress = async (req, res) => {
  const id = req.params.id;

  try {
    const addressToGet = await Address.findById(id);
    res.status(200).json(addressToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteAddress = async (req, res) => {
  const id = req.params.id;

  try {
    const addressToDelete = await Address.findByIdAndDelete(id);
    res.status(200).json(addressToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAddress = async (req, res) => {
  const id = req.params.id;
  const address = req.body.address;

  try {
    const addressToUpdate = await Address.findByIdAndUpdate(id, address, {
      new: true,
    });
    res.status(200).json(addressToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
