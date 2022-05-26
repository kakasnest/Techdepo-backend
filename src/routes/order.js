import { Router } from "express";
import { createOrder, getOrder, getOrders } from "../controllers/order.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getOrder);
router.route("/").get(getOrders);
router.route("/").post(createOrder);

export default router;
