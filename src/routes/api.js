import { Router, static as serve } from "express";

import publicRoutes from "./publicRoutes.js";
import privateRoutes from "./privateRoutes.js";

const router = Router();

router.use("/images", serve("images"));
router.use("/public", publicRoutes);
router.use("/private", privateRoutes);

export default router;
