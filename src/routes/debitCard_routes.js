import { Router } from "express";
import {
  addDebitCard,
  deleteDebitCard,
  getDebitCard,
  getDebitCards,
  updateDebitCard,
} from "../controllers/debitCards.js";

const router = Router();

router.route("/").post(addDebitCard).get(getDebitCards);
router
  .route("/:id")
  .get(getDebitCard)
  .put(updateDebitCard)
  .delete(deleteDebitCard);

export default router;
