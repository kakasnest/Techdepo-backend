import { Router } from "express";
import { createCategory, getCategories } from "../controllers/category.js";
import auth from "../middlewares/auth.js";
import { upload } from "../middlewares/storage.js";

const router = Router();

router.route("/").get(getCategories);
router.route("/").post(auth, upload.single("category_images"), createCategory);

export default router;
