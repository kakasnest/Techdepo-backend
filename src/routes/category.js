import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getProductsByCategoryId,
  updateCategory,
} from "../controllers/categories.js";
import authMW from "../middlewares/authMW.js";

const router = Router();

router.route("/").get(getCategories).post([authMW, addCategory]);
router
  .route("/:id")
  .delete([authMW, deleteCategory])
  .get(getProductsByCategoryId)
  .put([authMW, updateCategory]);

export default router;
