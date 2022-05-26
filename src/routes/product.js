import { Router } from "express";

import {
  createProduct,
  getProductById,
  getProducts,
} from "../controllers/product.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/:id").get(getProductById);
router.route("/").get(getProducts);
router.route("/").post(auth, upload.array("product_images"), createProduct);

export default router;
