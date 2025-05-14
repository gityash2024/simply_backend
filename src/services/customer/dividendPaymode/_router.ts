import { Router } from "express";
import { list } from "./dividendPaymode";

const router = Router();

router.post("/list", list);

export default router;
