import { Router } from "express";

import {
  createProduct,
  getProduct,
  getProducts,
} from "../controllers/product.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/:id").get(getProduct);
router.route("/").get(getProducts);
router.route("/").post(auth, upload.array("product_images"), createProduct);

export default router;
