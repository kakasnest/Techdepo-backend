import DebitCard from "../models/debitCard.js";

export const addDebitCard = (req, res) => {
  const debitCard = req.body.debitCard;

  try {
    DebitCard.create(debitCard);
    res.status(200).json({ message: "success" });
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

export const getDebitCard = async (req, res) => {
  const id = req.params.id;

  try {
    const debitCardToGet = await DebitCard.findById(id);
    res.status(200).json(debitCardToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteDebitCard = (req, res) => {
  const id = req.params.id;

  try {
    DebitCard.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDebitCard = (req, res) => {
  const id = req.params.id;
  const debitCard = req.body.debitCard;

  try {
    DebitCard.findByIdAndUpdate(id, debitCard);
    res.status(200).json({ message: "success" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
