import { Router } from "express";
import { loginWithMobile, loginWithUser, sendOtp, signup } from "./login";
const router = Router();

router.post("/signup", signup);
router.post("/send-otp", sendOtp);
router.post("/login-with-user", loginWithUser);
router.post("/login-with-mobile", loginWithMobile);

export default router;
