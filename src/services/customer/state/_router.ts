import { Router } from "express";
import { list } from "./state";
const router = Router();

router.post("/list", list);
export default router;
