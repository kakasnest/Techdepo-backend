import { Router } from "express";
import { getHeartBeat } from "../controllers/heartbeat.js";
import multer from "multer";

import category from "./category.js";
import product from "./product.js";
import user from "./user.js";
import review from "./review.js";
import debitCard from "./debitCard.js";
import address from "./address.js";
import order from "./order.js";
import auth from "./authentication.js";
import { uploadFiles } from "../controllers/handleFiles.js";

const router = Router();
const upload = multer({ dest: "/images/" });

router.use("/categories", category);
router.use("/products", product);
router.use("/users", user);
router.use("/reviews", review);
router.use("/debitcards", debitCard);
router.use("/addresses", address);
router.use("/orders", order);
router.use("/auth", auth);

router.route("/").get(getHeartBeat);
router.route("/images").post(upload.array("images"), uploadFiles);

export default router;
