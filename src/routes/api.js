import { Router } from "express";
import { getHeartBeat } from "../controllers/heartbeat.js";
import categoryRouter from "./category_routes.js";
import productRouter from "./product_routes.js";
import userRouter from "./user_routes.js";
import orderRouter from "./order_routes.js";
import reviewsRouter from "./review_routes.js";
import debitCardsRouter from "./debitCard_routes.js";
import addressesRouter from "./address_routes.js";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewsRouter);
router.use("/debitcards", debitCardsRouter);
router.use("/addresses", addressesRouter);
router.use("/orders", orderRouter);

router.route("/").get(getHeartBeat);
router.route("/register").post();
router.route("/login").post();
router.route("/images").get();

//TODO: isAdmin, isAuthenticated middleware for private routes

export default router;
