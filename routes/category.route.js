import express from "express";
import { addCategory, categoryList, remove, saveAllCategory, update } from "../controller/category.controller.js";

const router = express.Router();
router.post("/add", addCategory);
router.post("/saveallcategory", saveAllCategory);
router.delete("/delete/:id",remove);
router.put("/:id",update);
router.get("/category-list",categoryList);

export default router;
