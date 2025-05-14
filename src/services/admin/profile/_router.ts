import { Router } from "express";
import { personalDetailsUpdate, view } from "./profile";
const router = Router();

router.post("/view", view);
router.post("/update", personalDetailsUpdate);

export default router;
