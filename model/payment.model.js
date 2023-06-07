import mongoose from "mongoose";

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: false,
  },
  razorpay_payment_id: {
    type: String,
    required: false,
  },
  razorpay_signature: {
    type: String,
    required: false,
  },
});

export const Payment = mongoose.model("Payment", paymentSchema);
