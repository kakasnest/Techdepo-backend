import { Router } from "express";

import {
  createDebitCard,
  getDebitCardById,
  getDebitCardsByUserId,
} from "../controllers/debitCard.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/by_id/:id").get(getDebitCardById);
router.route("/by_user").get(getDebitCardsByUserId);
router.route("/").post(createDebitCard);

export default router;
