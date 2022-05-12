import { Router } from "express";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";
import authMW from "../middlewares/authMW.js";

const router = Router();
router.use(authMW);

router.route("/").get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
