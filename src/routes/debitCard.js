import { Router } from "express";
import {
  createDebitCard,
  deleteDebitCard,
  getDebitCard,
  getDebitCards,
  updateDebitCard,
} from "../controllers/debitCard.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/").post(createDebitCard);
router.route("/").get(getDebitCards);
router.route("/:id").get(getDebitCard);
router.route("/:id").put(updateDebitCard);
router.route("/:id").delete(deleteDebitCard);

export default router;
