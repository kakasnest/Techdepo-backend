import { Router } from "express";

import {
  createOrder,
  getOrderById,
  getOrdersByUserId,
} from "../controllers/order.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getOrderById);
router.route("/by_user").get(getOrdersByUserId);
router.route("/").post(createOrder);

export default router;
