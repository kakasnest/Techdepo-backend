import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getProductsByCategoryId,
  updateCategory,
} from "../controllers/category.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/").get(getCategories);
router.route("/").post([auth, addCategory]);
router.route("/:id").delete([auth, deleteCategory]);
router.route("/:id").get(getProductsByCategoryId);
router.route("/:id").put([auth, updateCategory]);

export default router;
