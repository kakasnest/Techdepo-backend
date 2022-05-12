import { Router } from "express";
import { getHeartBeat } from "../controllers/heartbeat.js";
import {
  category,
  product,
  user,
  order,
  review,
  debitCard,
  address,
  authentication,
} from "./index.js";

const router = Router();

router.use("/categories", category);
router.use("/products", product);
router.use("/users", user);
router.use("/reviews", review);
router.use("/debitcards", debitCard);
router.use("/addresses", address);
router.use("/orders", order);
router.use("/auth", authentication);

router.route("/").get(getHeartBeat);
router.route("/register").post();
router.route("/login").post();
router.route("/images").get();

export default router;
