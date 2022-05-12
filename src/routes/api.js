import { Router } from "express";
import { getHeartBeat } from "../controllers/heartbeat.js";

import category from "./category.js";
import product from "./product.js";
import user from "./user.js";
import review from "./review.js";
import debitCard from "./debitCard.js";
import address from "./address.js";
import order from "./order.js";
import auth from "./authentication.js";

const router = Router();

router.use("/categories", category);
router.use("/products", product);
router.use("/users", user);
router.use("/reviews", review);
router.use("/debitcards", debitCard);
router.use("/addresses", address);
router.use("/orders", order);
router.use("/auth", auth);

router.route("/").get(getHeartBeat);
router.route("/register").post();
router.route("/login").post();
router.route("/images").get();

export default router;
