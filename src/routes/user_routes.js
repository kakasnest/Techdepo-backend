import { Router } from "express";
import {
  addUser,
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/users.js";

const router = Router();

router.route("/").post(addUser).get(getUsers);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

export default router;
