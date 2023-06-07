import express from "express";
import { SignIn, SingUp } from "../controller/seller.controller.js";
import { body } from "express-validator";


const router = express.Router();

router.post("/signin", SignIn);//In body:sellerEmail,sellerPassword
router.post("/signup",
    body("sellerName", "Enter name").notEmpty(),
    body("sellerEmail", "Invalid Email").isEmail(),
    body("sellerContact").isNumeric(),
    body("sellerPassword", "enter password").notEmpty(), SingUp);

export default router;

