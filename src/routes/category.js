import { Router } from "express";
import {
  createCategory,
  deleteCategory,
  getCategories,
  updateCategory,
} from "../controllers/category.js";
import auth from "../middlewares/auth.js";

const router = Router();

router.route("/").get(getCategories);
router.route("/").post(auth, createCategory);
router.route("/:id").delete(auth, deleteCategory);
router.route("/:id").put(auth, updateCategory);

export default router;
