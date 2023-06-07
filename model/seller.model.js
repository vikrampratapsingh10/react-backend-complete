import mongoose from "mongoose";

const sellerSchema = new mongoose.Schema({
    sellerName: {
        type: String,
        required: true
    },
    sellerEmail: {
        type: String,
        required: true,
        trim: true
    },
    sellerPassword: {
        type: String,
        required: true
    },
    sellerContact: {
        type: String,
        required: true
    },
    sellerAddress: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        default: "Inactive"
    }
})

export const Seller = mongoose.model("seller", sellerSchema);