import { Router } from "express";
import {
  createAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "../controllers/address.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getAddress);
router.route("/").get(getAddresses);
router.route("/").post(createAddress);
router.route("/:id").delete(deleteAddress);
router.route("/:id").put(updateAddress);

export default router;
