import { Router } from "express";
import { registerCustomer } from "./soapApi";
const router = Router();

router.post("/register", registerCustomer);

export default router;
