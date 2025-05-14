import { Router } from "express";
import { list } from "./occupationCode";
const router = Router();

router.post("/list", list);

export default router;
