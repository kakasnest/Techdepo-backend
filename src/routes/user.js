import { Router } from "express";

import { getUserById, getUsers } from "../controllers/user.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/by_id/:id").get(getUserById);
router.route("/").get(getUsers);

export default router;
