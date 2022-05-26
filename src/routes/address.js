import { Router } from "express";

import {
  createAddress,
  getAddressById,
  getAddressesByUserId,
} from "../controllers/address.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getAddressById);
router.route("/").get(getAddressesByUserId);
router.route("/").post(createAddress);

export default router;
