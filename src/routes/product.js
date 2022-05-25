import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/product.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();
const post = [auth, upload.array("product_images"), createProduct];

router.route("/").get(getProducts);
router.route("/").post(post);
router.route("/:id").delete([auth, deleteProduct]);
router.route("/:id").get(getProduct);
router.route("/:id").put([auth, updateProduct]);

export default router;
