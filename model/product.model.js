import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
    {
      rating: { type: Number, required: true },
      comment: { type: String },
      customer: {
       type: mongoose.Schema.Types.ObjectId,
       required: true,
       ref: 'customer',
             },
     },
    {
      timestamps: true,
    }
  )

const productSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    title: {
        type: String
    },
    description: {
        type: String
    },
    price: {
        type: Number
    },
    discountPercentage: {
        type: Number
    },
    reviews: [reviewSchema],
    rating: {
        type: Number
    },
    stock: {
        type: Number
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    thumbnail: {
        type: String
    },
    images: {
        type: []
    },
    sellerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "seller",
        required: true
    },
    keyword: {
        type: String
    },
    numReviews: {
        type: Number,
        required: true,
        default: 0,
      }
})


export const Product = mongoose.model("product", productSchema);

