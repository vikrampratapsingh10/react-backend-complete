import express from "express";
import { payment3 } from "../controller/payment.controller.js";
// import { verificationToken } from "../middlewaress/tokenVerification.js";



const router = express.Router();
router.post("/razorpay", payment3)

export default router