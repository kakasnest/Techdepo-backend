import { Router } from "express";

import {
  createAddress,
  getAddressById,
  getAddressesByUserId,
} from "../controllers/address.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/by_id/:id").get(getAddressById);
router.route("/by_user").get(getAddressesByUserId);
router.route("/").post(createAddress);

export default router;
