import Review from "../models/review.js";

export const addReview = async (req, res) => {
  const review = req.body.review;

  try {
    const reviewToCreate = await Review.create(review);
    res.status(200).json(reviewToCreate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReview = async (req, res) => {
  const id = req.params.id;

  try {
    const reviewToGet = await Review.findById(id)
      .populate(["userId"])
      .select("name");
    res.status(200).json(reviewToGet);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().populate(["userId"]).select("name");
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteReview = async (req, res) => {
  const id = req.params.id;

  try {
    const reviewToDelete = await Review.findByIdAndDelete(id);
    res.status(200).json(reviewToDelete);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateReview = async (req, res) => {
  const id = req.params.id;
  const review = req.body.review;

  try {
    const reviewToUpdate = await Review.findByIdAndUpdate(id, review, {
      new: true,
    })
      .populate(["userId"])
      .select("name");
    res.status(200).json(reviewToUpdate);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
