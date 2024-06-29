import { Router } from "express";
import { addToCart, getUserCart, updateCart } from "./cart.controller.js";
import { auth } from "../../../middlewares/auth.js";

const router = Router();

router.get('/' , auth , getUserCart )
router.post("/addToCart", auth, addToCart);
router.put('/updateCart' , auth , updateCart )
export default router;
