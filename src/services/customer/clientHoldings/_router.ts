import { Router } from "express";
import { list } from "./clientHolding";
const router = Router();

router.post("/list", list);

export default router;
