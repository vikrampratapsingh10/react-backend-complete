import express from "express";
import { addtocart,removeCart,viewCartItems } from "../controller/cart.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";

const router = express.Router();


router.post("/add-to-cart", addtocart);
router.post("/viewCartItems", viewCartItems);
router.post("/deleteproduct",removeCart)


export default router;