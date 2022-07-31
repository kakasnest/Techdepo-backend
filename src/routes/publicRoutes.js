import { Router } from "express";

import category from "./public/category.js";
import entry from "./public/entry.js";
import product from "./public/product.js";
import review from "./public/review.js";

const router = Router();

router.route("/categories", category);
router.route("/entries", entry);
router.route("/products", product);
router.route("/review", review);

export default router;
