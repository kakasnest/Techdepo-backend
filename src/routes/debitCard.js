import { Router } from "express";
import {
  createDebitCard,
  getDebitCard,
  getDebitCards,
} from "../controllers/debitCard.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getDebitCard);
router.route("/").get(getDebitCards);
router.route("/").post(createDebitCard);

export default router;
