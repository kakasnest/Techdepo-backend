import { Router } from "express";

import {
  adminLogin,
  adminLogout,
  adminRegister,
  login,
  logout,
  register,
} from "../controllers/entry.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete(logout);
router.route("/admin_register").post(adminRegister);
router.route("/admin_login").post(adminLogin);
router.route("/admin_logout").delete(adminLogout);

export default router;
