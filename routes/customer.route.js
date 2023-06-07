import express from "express";

import { SignIn, SingUp, UploadImg, googleSignIn } from "../controller/customer.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";
import { body } from "express-validator";
import multer from "multer";


const upload = multer({dest:"public/Image"});

const router = express.Router();
router.post("/signup", body('customerName').notEmpty(), body('customerEmail').isEmail(), SingUp);
router.post("/signin", SignIn);
router.post("/save", upload.single("file"),UploadImg);
router.post("/google-signin",googleSignIn);


export default router;

