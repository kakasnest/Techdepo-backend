import { Router } from "express";
import {
  addDebitCard,
  deleteDebitCard,
  getDebitCard,
  getDebitCards,
  updateDebitCard,
} from "../controllers/debitCards.js";
import authMW from "../middlewares/authMW.js";

const router = Router();
router.use(authMW);

router.route("/").post(addDebitCard).get(getDebitCards);
router
  .route("/:id")
  .get(getDebitCard)
  .put(updateDebitCard)
  .delete(deleteDebitCard);

export default router;
