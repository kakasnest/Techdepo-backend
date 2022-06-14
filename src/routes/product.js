import { Router } from "express";

import {
  createProduct,
  getProductById,
  getProductsByCategoryId,
  resetProductImagesById,
  updateProductById,
} from "../controllers/product.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/:id").get(getProductById);
router.route("/").get(getProductsByCategoryId);
router.route("/").post(auth, upload.array("product_images"), createProduct);
router
  .route("/:id")
  .put(auth, upload.array("product_images"), updateProductById);
router.route("/:id").patch(resetProductImagesById);

export default router;
