import { Router } from "express";

import {
  createDebitCard,
  getDebitCardById,
  getDebitCardsByUserId,
} from "../controllers/debitCard.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getDebitCardById);
router.route("/").get(getDebitCardsByUserId);
router.route("/").post(createDebitCard);

export default router;
