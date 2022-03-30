import { Router } from "express";
import { addUser } from "../controllers/users.js";

const router = Router();

router.route("/").post(addUser);

export default router;
