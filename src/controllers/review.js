import Review from "../models/review.js";

export const getReviewById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    const reviewToGet = await Review.findById(id);
    res.status(200).json(reviewToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByUserId = async (req, res) => {
  const { userId } = req;

  try {
    const reviews = await Review.find({ userId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  const {
    params: { productId },
  } = req;

  try {
    const reviews = await Review.find({ productId });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  const {
    body: { text, rating, productId },
    userId,
  } = req;

  try {
    await Review.create({ text, rating, userId, productId });
    res.status(200).json({ message: "Review created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// export const deleteReview = async (req, res) => {
//   const {
//     params: { id },
//   } = req;

//   try {
//     await Review.findByIdAndDelete(id);
//     res.status(200).json({ message: "Review deleted" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// export const updateReview = async (req, res) => {
//   const {
//     params: { id },
//   } = req;
//   const {
//     body: { text, rating },
//   } = req;

//   try {
//     await Review.findByIdAndUpdate(id, { text, rating });
//     res.status(200).json({ message: "Review updated" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
