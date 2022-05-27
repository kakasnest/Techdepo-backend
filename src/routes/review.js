import { Router } from "express";

import {
  createReview,
  getReviewById,
  getReviewsByProductId,
  getReviewsByUserId,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getReviewById);
router.route("/by_user").get(getReviewsByUserId);
router.route("/by_product").get(getReviewsByProductId);
router.route("/").post(createReview);

export default router;
