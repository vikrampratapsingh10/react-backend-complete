import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema({
    customerid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "customer"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    deliveryAddress: String,
    contactNumber: Number,
    contactPerson: String,
    billAmount:
    {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "pending"
    },
    paymentMode: String,
    orderItem:
        [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "orderItems",
                required: true,
            }
        ]
})
export const Order = mongoose.model("Order", OrderSchema)