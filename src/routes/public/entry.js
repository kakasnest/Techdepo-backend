import { Router } from "express";

import {
  adminLogin,
  adminRegister,
  login,
  logout,
  register,
} from "../../controllers/entry.js";

const router = Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").delete((req, res) => logout(req, res, "auth"));
router.route("/admin_register").post(adminRegister);
router.route("/admin_login").post(adminLogin);
router
  .route("/admin_logout")
  .delete((req, res) => logout(req, res, "adminAuth"));

export default router;
