import { Router } from "express";
import { list } from "./taxStatus";
const router = Router();

router.post("/list", list);

export default router;
