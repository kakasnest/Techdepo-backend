import { Router } from "express";

import { getUserById, getUsers } from "../controllers/admin.js";
import auth from "../middlewares/auth.js";

const router = Router();
router.use(auth);

router.route("/:id").get(getUserById);
router.route("/").get(getUsers);

export default router;
