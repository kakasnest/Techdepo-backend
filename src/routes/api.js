import { Router, static as serve } from "express";

import category from "./category.js";
import product from "./product.js";
import admin from "./admin.js";
import review from "./review.js";
import address from "./address.js";
import order from "./order.js";
import entry from "./entry.js";

const router = Router();
router.use("/images", serve("images"));

router.use("/categories", category);
router.use("/products", product);
router.use("/admin", admin);
router.use("/reviews", review);
router.use("/addresses", address);
router.use("/orders", order);
router.use("/auth", entry);

export default router;
