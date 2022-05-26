import { Router } from "express";

import { createReview, getReview, getReviews } from "../controllers/review.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getReview);
router.route("/").get(getReviews);
router.route("/").post(createReview);

export default router;
