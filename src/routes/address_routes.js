import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddresses,
  updateAddress,
} from "../controllers/addresses.js";

const router = Router();

router.route("/").post(addAddress).get(getAddresses);
router.route("/:id").get(getAddress).put(updateAddress).delete(deleteAddress);

export default router;
