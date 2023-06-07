import express from "express";
import { InfProduct, Save, addPage, createProductReview, featuresProduct, getProductByCategory, getProductById, productAdd, productListBySellerId, removeProduct, search, updateProduct, updateproducts, viewProduct } from "../controller/product.controller.js";

import verifyTokenForSeller from "../middlewares/tokenVerification.js";
import multer from "multer";



const upload = multer({dest:"public/Image/"});
const uploads = multer({dest:"public/Images/"});


const router = express.Router();
router.post("/saveproduct", Save);
router.get("/productlist/:sellerId", productListBySellerId);//sellerId In params
router.post("/update/:_id", updateproducts);
router.post("/delete/:_id", removeProduct);
router.post("/updated/:_id", updateProduct);
router.get("/save", addPage);
router.get("/viewproduct", viewProduct);
router.get("/limitLoadproduct", InfProduct);
router.get("/featuresproduct", featuresProduct);
router.get("/:id", getProductById);
router.get("/products/:categoryId",getProductByCategory)
router.get("/search/:keyword",search)
router.post("/save", uploads.any("image"),productAdd);
router.post("/addreview/reviews",createProductReview)


export default router;