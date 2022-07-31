import { Router } from "express";

import {
  createAddress,
  deleteAddressById,
  getAddressesByUserId,
  updateAddressById,
} from "../../controllers/address.js";
import auth from "../../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/").get(getAddressesByUserId);
router.route("/").post(createAddress);
router.route("/:id").delete(deleteAddressById);
router.route("/:id").put(updateAddressById);

export default router;
