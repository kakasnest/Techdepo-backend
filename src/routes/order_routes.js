import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders.js";

const router = Router();

router.route("/").post(addOrder).get(getOrders);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default router;
