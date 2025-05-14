import { Router } from "express";
import { list } from "./panExemptCategory";
const router = Router();

router.post("/list", list);

export default router;
