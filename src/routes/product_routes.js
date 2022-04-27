import { Router } from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";
import authMW from "../middlewares/authMW.js";

const router = Router();

router.route("/").get(getProducts).post([authMW, addProduct]);
router
  .route("/:id")
  .delete([authMW, deleteProduct])
  .get(getProduct)
  .put([authMW, updateProduct]);

export default router;
