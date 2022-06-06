import { Router } from "express";

import {
  createCategory,
  deleteCategoryById,
  getCategories,
  updateCategoryById,
} from "../controllers/category.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/").get(getCategories);
router.route("/").post(auth, upload.single("category_images"), createCategory);
router.route("/:id").delete(deleteCategoryById);
router
  .route("/:id")
  .put(auth, upload.single("category_images"), updateCategoryById);

export default router;
