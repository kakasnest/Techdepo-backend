import { Router } from "express";

import {
  createReview,
  getReviewById,
  getReviewsByUserId,
} from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getReviewById);
router.route("/").get(getReviewsByUserId);
router.route("/").post(createReview);

export default router;
