import DebitCard from "../models/debitCard.js";

export const addDebitCard = async (req, res) => {
  const debitCard = req.body.debitCard;

  try {
    const debitCardToCreate = await DebitCard.create(debitCard);
    res.status(200).json(debitCardToCreate);
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

export const deleteDebitCard = async (req, res) => {
  const id = req.params.id;

  try {
    const debitCardToDelete = await DebitCard.findByIdAndDelete(id);
    res.status(200).json(debitCardToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateDebitCard = async (req, res) => {
  const id = req.params.id;
  const debitCard = req.body.debitCard;

  try {
    const debitCardToUpdate = await DebitCard.findByIdAndUpdate(id, debitCard, {
      new: true,
    });
    res.status(200).json(debitCardToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
