import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getReview);
router.route("/").get(getReviews);
router.route("/").post(createReview);
router.route("/:id").delete(deleteReview);
router.route("/:id").put(updateReview);

export default router;
