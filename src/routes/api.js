import { Router } from "express";
import { getHeartBeat } from "../controllers/heartbeat.js";
import categoryRouter from "../routes/categories_routes.js";
import productRouter from "../routes/products_routes.js";
import userRouter from "../routes/users_routes.js";

const router = Router();

router.use("/categories", categoryRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.route("/").get(getHeartBeat);

//TODO: isAdmin middleware for private routes

export default router;
