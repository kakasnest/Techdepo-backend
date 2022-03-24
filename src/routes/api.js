import { Router } from "express";
import {
  deleteHeartBeat,
  getHeartBeat,
  patchHeartBeat,
  postHeartBeat,
  putHeartBeat,
} from "../controllers/heartbeat.js";
import publicRouter from "./public.js";
import privateRouter from "./private.js";

const router = Router();

router.use("/public", publicRouter);
router.use("/private", privateRouter);
router
  .route("/")
  .get(getHeartBeat)
  .post(postHeartBeat)
  .put(putHeartBeat)
  .delete(deleteHeartBeat)
  .patch(patchHeartBeat);

export default router;
