import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getProductsByCategoryId,
  updateCategory,
} from "../controllers/categories.js";

const router = Router();

router.route("/").get(getCategories).post(addCategory);
router
  .route("/:id")
  .delete(deleteCategory)
  .get(getProductsByCategoryId)
  .put(updateCategory);

export default router;
