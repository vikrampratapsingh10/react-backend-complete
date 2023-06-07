import mongoose from "mongoose";

const WishlistSchema = new mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"customer"
    },
    wishlistItems:[{
        productId:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"product"
        }
    }]
});

export const Wishlist = mongoose.model("wishlist",WishlistSchema);