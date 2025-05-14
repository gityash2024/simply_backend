import { Router } from "express";
import { list } from "./country";
const router = Router();

router.post("/list", list);
export default router;
