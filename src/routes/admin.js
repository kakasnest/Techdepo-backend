import { Router } from "express";

import { getUserById, getUsers } from "../controllers/user.js";
import adminAuth from "../middlewares/adminAuth.js";

const router = Router();
router.use(adminAuth);

router.route("/:id").get(getUserById);
router.route("/").get(getUsers);

export default router;
