import { Router } from "express";
import {
  addReview,
  deleteReview,
  getReview,
  getReviews,
  updateReview,
} from "../controllers/reviews.js";
import authMW from "../middlewares/authMW.js";

const router = Router();
router.use(authMW);

router.route("/").post(addReview).get(getReviews);
router.route("/:id").get(getReview).put(updateReview).delete(deleteReview);

export default router;
