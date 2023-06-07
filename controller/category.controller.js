import { Category } from "../model/category.model.js";
import { validationResult } from "express-validator";

export const addCategory = async (request, response, next) => {
    try {
        let error = await validationResult(request);
        if (!error.isEmpty())
            return response.status(400).json({ error: "Bad request", status: false })

        const category = await Category.create(request.body);
        return response.status(200).json({ message: "category saved..", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const saveAllCategory = async (request, response, next) => {
    try {
        for (let category of request.body.categories) {
            await Category.create({ categoryName: category });
        }
        return response.status(200).json({ message: "Category saved...", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const categoryList = async (request, response, next) => {
    try {
        let categoires = await Category.find();
        return response.status(200).json({ categories: categoires, status: true });
    }
    catch (err) {
        return response.status(500).json({ error: "Internal server error", status: false });
    }

}

export const remove = (request, response, next) => {
    Category.findByIdAndRemove(request.params.id)
        .then(result => {
            return response.status(200).json({ message: "Category removed", status: true });
        }).catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal Server Error", status: false });
        })
}

export const update = async (request, response, next) => {
    try {
        const status = await Category.findByIdAndUpdate(
            request.params.id, {
            categoryName: request.body.categoryName
        },
            { new: true })
        if (!status)
            return response.status(401).json({ error: "Bad request ", status: false })
        return response.status(200).json({ message: "category updated", status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}