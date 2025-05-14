import { Router } from "express";
import { list } from "./communicationMode";
const router = Router();

router.post("/list", list);

export default router;
