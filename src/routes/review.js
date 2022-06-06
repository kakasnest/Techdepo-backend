import { Router } from "express";

import {
  createReview,
  deleteReviewById,
  getReviewsByProductId,
  getReviewsByUserId,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/").get(getReviewsByUserId);
router.route("/:productId").get(getReviewsByProductId);
router.route("/").post(createReview);
router.route("/:id").delete(deleteReviewById);

export default router;
