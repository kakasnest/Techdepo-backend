import { Router } from "express";
import {
  addOrder,
  deleteOrder,
  getOrder,
  getOrders,
  updateOrder,
} from "../controllers/orders.js";
import authMW from "../middlewares/authMW.js";

const router = Router();
router.use(authMW);

router.route("/").post(addOrder).get(getOrders);
router.route("/:id").get(getOrder).put(updateOrder).delete(deleteOrder);

export default router;
