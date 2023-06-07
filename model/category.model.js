import mongoose from "mongoose";

const categoryScheme = new mongoose.Schema({
    category_id: {
        type: String
    },
    categoryName: {
        type: String
    }
});

export const Category = mongoose.model("category", categoryScheme);