import { Router } from "express";

import {
  getProductById,
  getProductsByCategoryId,
} from "../controllers/product.js";

const router = Router();

router.route("/:id").get(getProductById);
router.route("/").get(getProductsByCategoryId);

export default router;
