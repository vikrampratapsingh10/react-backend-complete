import { Wishlist } from "../model/wishlist.model.js";

export const wishlist = async (request, response, next) => {
  try {
    let wishlist = await Wishlist.findOne({ customerId: request.body.customerId });
    if (wishlist) {
      let wishlistItemsList = wishlist.wishlistItems;
      let index = wishlistItemsList.findIndex((item) => item.productId == request.body.productId)
      if (index != -1)
        return response.status(200).json({ message: "Product already added in wishlist", status: true })
      else {
        wishlist.wishlistItems.push({ productId: request.body.productId });
        let saveWishlist = await wishlist.save({});
        return response.status(200).json({ message: "Product successfull added in wishlist", status: true });
      }
    }
    else {
      let saveCart = await Wishlist.create({
        customerId: request.body.customerId,
        wishlistItems: [{ productId: request.body.productId }]
      });
      return response.status(200).json({ message: "Item added successfull in wishlist", status: true })
    }
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ error: "Internal Server Error", status: false });
  }
}

export const fetchWishlist = async (request, response, next) => {
  try {
    let wishlistItems = await Wishlist.findOne({ customerId: request.body.customerId }).populate("wishlistItems.productId")
    return response.status(200).json({ wishlist: wishlistItems, status: true })
  }
  catch (err) {
    console.log(err)
    return response.status(500).json({ error: "internal server error", status: false })
  }
}

export const removeWishlist = async (request, response, next) => {
  try {
    let wishlist = await Wishlist.findOne({ customerId: request.body.customerId })
    if (wishlist) {
      let wishlistItemsList = wishlist.wishlistItems;
      let index = wishlistItemsList.findIndex((item) => item.productId == request.body.productId)
      console.log(index)
      if (index != -1){
        wishlist.wishlistItems.splice(index, 1)
      wishlist.save();
      return response.status(200).json({ message: "product removed in wishlist" })
      }
      else{
        return response.status(400).json({error:"not found",status:false});
      }
    }
    else {
      return response.status(400).json({ error: "Bad request", status: false });
    }
  }
  catch (err) {
    console.log(err);
    return response.status(500).json({ message: "Internal server error", status: false });
  }
}