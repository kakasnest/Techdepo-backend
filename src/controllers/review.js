import Product from "../models/product.js";
import Review from "../models/review.js";
import { isValidObjectId } from "../utils/mongoIdValidation.js";

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
        .skip((pageNumber - 1) * 10)
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
    if (isValidObjectId(productId)) {
      const isValidProductId = await Product.exists({ _id: productId });
      if (isValidProductId) {
        await Review.create({ text, rating, userId, productId });
        res.status(200).json({ message: "Review created" });
      } else {
        res.status(500).json({ message: "Provided productId isn't valid" });
      }
    } else {
      res.status(500).json({ message: "Provided productId isn't valid" });
    }
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
  } = req;
  const {
    body: { text, rating },
  } = req;
  const ratingCondition =
    rating && Number.isInteger(rating) && !rating < 1 && !rating > 5;

  try {
    if (ratingCondition) {
      await Review.findByIdAndUpdate(id, { text, rating });
      res.status(200).json({ message: "Review updated" });
    } else if (text) {
      await Review.findByIdAndUpdate(id, { text });
      res.status(200).json({ message: "Review updated" });
    } else {
      res.status(500).json({
        message:
          "No data provided for category update or the data isn't acceptable",
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
