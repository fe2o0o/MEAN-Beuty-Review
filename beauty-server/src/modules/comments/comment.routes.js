import { Router } from "express";
import { auth } from "../../../middlewares/auth.js";
import { addComment } from "./comment.controller.js";
const router = Router();


router.post('/', auth ,addComment )



export default router