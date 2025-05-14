import { Router } from "express";
import { list } from "./customer";
const router = Router();

router.post("/list", list);

export default router;
