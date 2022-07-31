import { Router } from "express";

import { getReviewsByProductId } from "../controllers/review.js";

const router = Router();

router.route("/by_productId").get(getReviewsByProductId);

export default router;
