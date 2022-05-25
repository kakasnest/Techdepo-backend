import Review from "../models/review.js";

export const getReview = async (req, res) => {
  const id = req.params.id;

  try {
    const reviewToGet = await Review.findById(id);
    res.status(200).json(reviewToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find();
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const createReview = async (req, res) => {
  const review = req.body.review;

  try {
    await Review.create(review);
    res.status(200).json({ message: "Review created" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    await Review.findByIdAndDelete(id);
    res.status(200).json({ message: "Review deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  const id = req.params.id;
  const review = req.body.review;

  try {
    await Review.findByIdAndUpdate(id, review);
    res.status(200).json({ message: "Review updated" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
