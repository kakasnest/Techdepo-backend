import { Router, static as serve } from "express";

import { getHeartBeat } from "../controllers/heartbeat.js";
import category from "./category.js";
import product from "./product.js";
import user from "./user.js";
import review from "./review.js";
import address from "./address.js";
import order from "./order.js";
import entry from "./entry.js";

const router = Router();
router.use("/images", serve("images"));

router.use("/categories", category);
router.use("/products", product);
router.use("/users", user);
router.use("/reviews", review);
router.use("/addresses", address);
router.use("/orders", order);
router.use("/auth", entry);

router.route("/").get(getHeartBeat);

export default router;
