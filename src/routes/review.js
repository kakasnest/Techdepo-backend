import { Router } from "express";

import {
  createReview,
  deleteReviewById,
  getReviewsByProductId,
  getReviewsByUserId,
  updateReviewById,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/").get(getReviewsByUserId);
router.route("/by_productId").get(getReviewsByProductId);
router.route("/").post(createReview);
router.route("/:id").delete(deleteReviewById);
router.route("/:id").put(updateReviewById);

export default router;
