import { Router } from "express";
import {
  addCategory,
  deleteCategory,
  getCategories,
  getCategory,
} from "../controllers/categories.js";
import { getHeartBeat } from "../controllers/heartbeat.js";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

//Router init
const router = Router();

//Route for API testing
router.route("/").get(getHeartBeat);

//TODO: add role to user
//TODO: isAdmin middleware for private routes

//Routes for categories
router.route("/categories").get(getCategories).post(addCategory);
router.route("/categories/:id").get(getCategory).delete(deleteCategory);

//Routes for products
router.route("/products").get(getProducts).post(addProduct);
router
  .route("/products/:id")
  .get(getProduct)
  .put(updateProduct)
  .delete(deleteProduct);

export default router;
