import mongoose from "mongoose";

const orderItemsSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        default: 1,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "product",
    },
    sellerId: {
        type: String
    }
})

export const OrderItems = mongoose.model("orderItems", orderItemsSchema);