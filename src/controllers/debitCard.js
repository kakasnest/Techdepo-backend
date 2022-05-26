import DebitCard from "../models/debitCard.js";

export const getDebitCardById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const debitCard = await DebitCard.findById(id);
    res.status(200).json(debitCard);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDebitCardsByUserId = async (req, res) => {
  const { userId } = req;

  try {
    const debitCards = await DebitCard.find({ userId });
    res.status(200).json(debitCards);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createDebitCard = async (req, res) => {
  const {
    body: { name, expDate, cardNumber, cvv },
    userId,
  } = req;

  try {
    await DebitCard.create({ name, expDate, cardNumber, cvv, userId });
    res.status(200).json({ message: "Debit card created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const deleteDebitCard = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await DebitCard.findByIdAndDelete(id);
//     res.status(200).json({ message: "Debit card deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateDebitCard = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const {
//     body: { name, expDate, cardNumber, cvv },
//   } = req;

//   try {
//     await DebitCard.findByIdAndUpdate(id, { name, expDate, cardNumber, cvv });
//     res.status(200).json({ message: "Debit card updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
