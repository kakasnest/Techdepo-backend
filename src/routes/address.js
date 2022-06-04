import { Router } from "express";

import {
  createAddress,
  deleteAddressById,
  getAddressesByUserId,
} from "../controllers/address.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/by_user").get(getAddressesByUserId);
router.route("/").post(createAddress);
router.route("/by_id/:id").delete(deleteAddressById);

export default router;
