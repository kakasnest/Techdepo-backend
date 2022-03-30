import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "../controllers/categories.js";

const router = Router();

router.route("/").get(getCategories).post(addCategory);
router.route("/:id").delete(deleteCategory).get(getCategory);

export default router;
