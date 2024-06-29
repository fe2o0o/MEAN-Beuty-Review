import { Router } from "express";
import { signup,login } from "./auth.controller.js";
import { checkSignup,checkLogin } from "../../../middlewares/auth.js";
const router = Router();



router.post('/signup', checkSignup ,signup)

router.post("/login", checkLogin, login);
export default router;