import DebitCard from "../models/debitCard.js";

export const getDebitCard = async (req, res) => {
  const id = req.params.id;

  try {
    const debitCard = await DebitCard.findById(id);
    res.status(200).json(debitCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDebitCards = async (req, res) => {
  try {
    const debitCards = await DebitCard.find();
    res.status(200).json(debitCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDebitCard = async (req, res) => {
  const debitCard = req.body.debitCard;

  try {
    await DebitCard.create(debitCard);
    res.status(200).json({ message: "Debit card created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDebitCard = async (req, res) => {
  const id = req.params.id;

  try {
    await DebitCard.findByIdAndDelete(id);
    res.status(200).json({ message: "Debit card deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDebitCard = async (req, res) => {
  const id = req.params.id;
  const debitCard = req.body.debitCard;

  try {
    await DebitCard.findByIdAndUpdate(id, debitCard);
    res.status(200).json({ message: "Debit card updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
