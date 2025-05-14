import { Router } from "express";
import { list } from "./accountType";
const router = Router();

router.post("/list", list);

export default router;
