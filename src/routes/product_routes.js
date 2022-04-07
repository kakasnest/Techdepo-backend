import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

const router = Router();

router.route("/").get(getProducts).post(addProduct);
router.route("/:id").delete(deleteProduct).get(getProduct).put(updateProduct);

export default router;
