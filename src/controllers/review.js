import Review from "../models/review.js";

export const getReviewsByUserId = async (req, res) => {
  const {
    body: { pageNumber },
    userId,
  } = req;

  try {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      const reviews = await Review.find({ userId })
        .select(["-createdAt", "-updatedAt", "-__v", "-userId"])
        .populate({
          path: "productId",
          model: "Product",
          select: ["name", "thumbnail"],
        })
        .sort({ _id: 1 })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
        .limit(10);
      res.status(200).json(reviews);
    } else {
      res.status(500).json({
        message: "The pageNumber must be an integer greater than zero",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  const {
    params: { productId },
    body: { pageNumber },
  } = req;

  try {
    if (Number.isInteger(pageNumber) && pageNumber > 0) {
      const reviews = await Review.find({ productId })
        .select(["text", "rating", "userId"])
        .populate({
          path: "userId",
          model: "User",
          select: ["fullNameHUN", "fullNameENG", "image"],
        })
        .sort({ _id: 1 })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
        .limit(10);
      res.status(200).json(reviews);
    } else {
      res.status(500).json({
        message: "The pageNumber must be an integer greater than zero",
      });
    }
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

export const deleteReviewById = async (req, res) => {
  const {
    params: { id },
  } = req;

  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

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
