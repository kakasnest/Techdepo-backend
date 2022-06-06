import { Router } from "express";

import { login, logout, register } from "../controllers/entry.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(logout);

export default router;
