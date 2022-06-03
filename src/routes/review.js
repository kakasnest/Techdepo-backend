import { Router } from "express";

import {
  createReview,
  getReviewsByProductId,
  getReviewsByUserId,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/by_user").get(getReviewsByUserId);
router.route("/by_product/:productId").get(getReviewsByProductId);
router.route("/").post(createReview);

export default router;
