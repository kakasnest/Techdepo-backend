import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getUser);
router.route("/").get(getUsers);
router.route("/:id").delete(deleteUser);
router.route("/:id").put(updateUser);

export default router;
