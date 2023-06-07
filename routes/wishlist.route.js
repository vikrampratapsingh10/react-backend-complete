import express from "express";
import { fetchWishlist, removeWishlist, wishlist } from "../controller/wishlist.controller.js";
import { verificationToken } from "../middlewaress/tokenVerification.js";

const router = express.Router();

router.post('/addtowishlist',wishlist);
router.post('/viewwishlist',fetchWishlist);
router.post('/delete',removeWishlist);

export default router;