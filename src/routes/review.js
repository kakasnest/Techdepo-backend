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

router.route("/").post(createReview);
router.route("/").get(getReviews);
router.route("/:id").get(getReview);
router.route("/:id").put(updateReview);
router.route("/:id").delete(deleteReview);

export default router;
