import { Router } from "express";
import {
  createOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/order.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getOrder);
router.route("/").get(getOrders);
router.route("/").post(createOrder);
router.route("/:id").delete(deleteOrder);
router.route("/:id").put(updateOrder);

export default router;
