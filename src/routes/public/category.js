import { Router } from "express";

import {
  createCategory,
  deleteCategoryById,
  getCategories,
  resetCategoryImageById,
  updateCategoryById,
} from "../controllers/category.js";
import adminAuth from "../middlewares/adminAuth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/").get(getCategories);
router
  .route("/")
  .post(adminAuth, upload.single("category_images"), createCategory);
router.route("/:id").delete(adminAuth, deleteCategoryById);
router
  .route("/:id")
  .put(adminAuth, upload.single("category_images"), updateCategoryById);
router.route("/:id").patch(adminAuth, resetCategoryImageById);

export default router;
