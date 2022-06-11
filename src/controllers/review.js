import Review from "../models/review.js";
import { hasPaginationParams } from "../utils/controllerUtils/general.js";
import { productExists } from "../utils/controllerUtils/product.js";
import {
  hasUpdateProps,
  reviewExists,
} from "../utils/controllerUtils/review.js";

export const getReviewsByUserId = async (req, res) => {
  const {
    query: { page, limit },
    userId,
  } = req;

  try {
    if (hasPaginationParams(page, limit)) {
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
    query: { page, limit },
    body: { productId },
  } = req;

  try {
    if (await productExists(productId)) {
      if (hasPaginationParams(page, limit)) {
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
    } else {
      throw new Error("There isn't a product with this id");
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
    if (await productExists(productId)) {
      const product = { text, rating, userId, productId };
      await Review.create(product);
      res.status(200).json({ message: "Review created" });
    } else {
      throw new Error("There isn't a product with this id");
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
    if (await reviewExists(id)) {
      await Review.findByIdAndDelete(id);
      res.status(200).json({ message: "Review deleted" });
    } else {
      throw new Error("There isn't a review with this id");
    }
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
    if (await reviewExists(id)) {
      const review = { text, rating };
      if (hasUpdateProps(review)) {
        await Review.findByIdAndUpdate(id, review, { runValidators: true });
        res.status(200).json({ message: "Review updated" });
      } else {
        throw new Error("Rating and text are required for review update");
      }
    } else {
      throw new Error("There isn't a review with this id");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
