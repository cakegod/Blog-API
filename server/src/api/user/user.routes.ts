import express from "express";
import { postLogin, postSignup } from "./user.handlers";

const router = express.Router();

router.post("/login", postLogin);
router.post("/signup", postSignup);

export default router;
