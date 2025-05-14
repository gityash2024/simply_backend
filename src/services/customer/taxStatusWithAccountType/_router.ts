import { Router } from "express";
import { list } from "./taxStatusWithAccountType";
const router = Router();

router.post("/list", list);
export default router;
