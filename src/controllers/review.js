import Review from "../models/review.js";
import { checkPaginationParams } from "../utils/controller_related/general.js";

export const getReviewsByUserId = async (req, res) => {
  const {
    query: { page, limit },
    userId,
  } = req;

  try {
    if (checkPaginationParams(page, limit)) {
      const reviews = await Review.find({ userId })
        .select(["-__v", "-userId"])
        .populate({
          path: "productId",
          model: "Product",
          select: ["name", "thumbnail"],
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(reviews);
    } else {
      throw new Error(
        "The page and limit parameters must be integers greater than zero"
      );
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviewsByProductId = async (req, res) => {
  const {
    query: { page, limit, productId },
  } = req;

  try {
    if (checkPaginationParams(page, limit)) {
      const reviews = await Review.find({ productId })
        .select(["-__v", "-productId"])
        .populate({
          path: "userId",
          model: "User",
          select: ["fullNameHUN", "fullNameENG", "image"],
        })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);
      res.status(200).json(reviews);
    } else {
      throw new Error(
        "The page and limit parameters must be integers greater than zero"
      );
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
    const review = { text, rating, userId, productId };
    await Review.create(review);
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

export const updateReviewById = async (req, res) => {
  const {
    params: { id },
    body: { text, rating },
  } = req;

  try {
    const review = { text, rating };
    await Review.findByIdAndUpdate(id, review, { runValidators: true });
    res.status(200).json({ message: "Review updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
