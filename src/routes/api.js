import { Router } from "express";
import {
  deleteHeartBeat,
  getHeartBeat,
  patchHeartBeat,
  postHeartBeat,
  putHeartBeat,
} from "../controllers/heartbeat.js";

const router = Router();

router
  .route("/")
  .get(getHeartBeat)
  .post(postHeartBeat)
  .put(putHeartBeat)
  .delete(deleteHeartBeat)
  .patch(patchHeartBeat);

export default router;
