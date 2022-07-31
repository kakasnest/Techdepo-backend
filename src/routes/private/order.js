import { Router } from "express";

import { createOrder, getOrdersByUserId } from "../../controllers/order.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/").get(getOrdersByUserId);
router.route("/").post(createOrder);

export default router;
