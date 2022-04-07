import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  getAddress,
  getAddresss,
  updateAddress,
} from "../controllers/addresses.js";

const router = Router();

router.route("/").post(addAddress).get(getAddresss);
router.route("/:id").get(getAddress).put(updateAddress).delete(deleteAddress);

export default router;
