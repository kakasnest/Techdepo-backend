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

router.route("/").get(getUsers);
router.route("/:id").get(getUser);
router.route("/:id").put(updateUser);
router.route("/:id").delete(deleteUser);

export default router;
