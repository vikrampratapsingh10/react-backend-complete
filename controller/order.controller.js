import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";
import nodemailer from "nodemailer";
import { OrderItems } from "../model/orderItem.model.js";
import mongoose from "mongoose";



const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: 'mukuldixit931@gmail.com',
        pass: 'oxfgqzeowaciixiv',
    },
    secure: true,
});



export const placeOrder = async (request, response, next) => {
    try {
        const orderIds = Promise.all(
            request.body.orderItems.map(async (orderItem) => {
                let newOrderItems = new OrderItems({
                    quantity: orderItem.quantity,
                    product: orderItem.productId._id
                });
                await newOrderItems.save();
                return newOrderItems._id;
            })
        )
      
        const orderIdArray = await orderIds;
        const customerinfo = await Customer.findOne({ _id: request.body.customerid })
        if (!customerinfo)
            return response.status(401).json({ message: "No user found", status: false })
        else {
            const billAmount = await Promise.all(
                orderIdArray.map(async (id) => {
                    const item = await OrderItems.findById(id).populate("product", "price")
                    return item.product.price * item.quantity;
                   
                })
            )
            const sumPrice = billAmount.reduce((a, b) => a + b, 0)
            const order = new Order({
                customerid: customerinfo.id,
                deliveryAddress: request.body.deliveryAddress,
                billAmount: sumPrice,
                contactNumber: request.body.contactNumber,
                contactPerson: request.body.contactPerson,
                orderItem: orderIdArray,
                date: request.body.date,
            })

            await order.save()

            // return response.status(200).json({ orderdetail: order, status: true })
            const orderitems = await Order.findById({ _id: order._id }).populate({
                path: "orderItem",
                populate: { path: "product" }
            })
               const data=orderitems.orderItem.map((item,index)=>{
               return item.product.title.substring(0,20)
               })
                 console.log(data)
               const price=orderitems.orderItem.map((item,index)=>{
                return item.product.price
                })
               console.log(price)

              
    
            Date.prototype.addDays = function (day) {
                var date = new Date(this.valueOf());
                date.setDate(date.getDate() + day);
                return date;
            }
            var date = new Date();
            await order.save()

            var mailData = {
                from: 'mukuldixit931@gmail.com',
                to: "bugslayers45@gmail.com",
                subject: 'Order Confirmation',

                html: '<table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td align="center" style="background-color: #eeeeee;" bgcolor="#eeeeee"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;"> <tr> <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#59ab6e"> <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;"> <tr> <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px;" class="mobile-center"> <h1 style="font-size: 36px; font-weight: 800; margin: 0; color: #ffffff;">Indian Handicraft</h1> </td> </tr> </table> </div> <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;" class="mobile-hide"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;"> <tr> <td align="right" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 48px; font-weight: 400; line-height: 48px;"> <table cellspacing="0" cellpadding="0" border="0" align="right"> <tr> <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400;"> <p style="font-size: 18px; font-weight: 400; margin: 0; color: #ffffff;"><a href="#" target="_blank" style="color: #ffffff; text-decoration: none;">Shop &nbsp;</a></p> </td> <td style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 18px; font-weight: 400; line-height: 24px;"> <a href="#" target="_blank" style="color: #ffffff; text-decoration: none;"><img src="https://img.icons8.com/color/48/000000/small-business.png" width="27" height="23" style="display: block; border: 0px;"/></a> </td> </tr> </table> </td> </tr> </table> </div> </td> </tr> <tr> <td align="center" style="padding: 35px 35px 20px 35px; background-color: #ffffff;" bgcolor="#ffffff"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;"> <tr> <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <img src="https://img.icons8.com/carbon-copy/100/000000/checked-checkbox.png" width="125" height="120" style="display: block; border: 0px;" /><br> <h2 style="font-size: 30px; font-weight: 800; line-height: 36px; color: #333333; margin: 0;"> Thank You For Your Order! </h2> </td> </tr> <tr> <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 10px;"> <p style="font-size: 16px; font-weight: 400; line-height: 24px; color: #777777;"> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Praesentium iste ipsa numquam odio dolores, nam. </p> </td> </tr> <tr> <td align="left" style="padding-top: 20px;"> <table cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td width="75%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;"> Order Confirmation # </td> <td width="25%" align="left" bgcolor="#eeeeee" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px;">' + order._id +'</td> </tr> <tr><li width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'+data+'</li><br><td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 15px 10px 5px 10px;">'+price+'</td><br></tr> <tr> <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Shipping</td> <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">₹60</td> </tr> <tr> <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;"> Sales Tax </td><td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">₹0.00 </td></tr><tr><td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">Status</td> <td width="25%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding: 5px 10px;">' + order.status + '</td></tr></table> </td> </tr> <tr> <td align="left" style="padding-top: 20px;"> <table cellspacing="0" cellpadding="0" border="0" width="100%"> <tr> <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;"> TOTAL </td> <td width="25%" vaule="billAmount" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 24px; padding: 10px; border-top: 3px solid #eeeeee; border-bottom: 3px solid #eeeeee;">₹' + order.billAmount + '</td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;"> <tr> <td align="center" valign="top" style="font-size:0;"> <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;"> <tr> <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;"> <p style="font-weight: 800;">Delivery Address</p> <p>' + order.deliveryAddress + '</td> </tr> </table> </div> <div style="display:inline-block; max-width:50%; min-width:240px; vertical-align:top; width:100%;"> <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;"> <tr> <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px;"> <p style="font-weight: 800;">Estimated Delivery Date</p> <p>' + date.addDays(5) + '</p> </td> </tr> </table> </div> </td> </tr> </table> </td> </tr> <tr> <td align="center" style=" padding: 35px; background-color:#38aa55;" bgcolor="#1b9ba3"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;"> <tr> <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;"> <h2 style="font-size: 24px; font-weight: 800; line-height: 30px; color: #ffffff; margin: 0;"> Get 30% off your next order. </h2> </td> </tr> <tr> <td align="center" style="padding: 25px 0 15px 0;"> <table border="0" cellspacing="0" cellpadding="0"> <tr> <td align="center" style="border-radius: 5px;" bgcolor="#66b3b7"> <a href="#" target="_blank" style="font-size: 18px; font-family: Open Sans, Helvetica, Arial, sans-serif; color: #ffffff; text-decoration: none; border-radius: 5px; background-color: #59ab6e; padding: 15px 30px; border: 1px solid #59ab6e; display: block;">Shop Again</a> </td> </tr> </table> </td> </tr> </table> </td> </tr> <tr> <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff"> <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;"> <tr> <td align="center"> <img src="https://e7.pngegg.com/pngimages/719/900/png-clipart-india-craft-nation-handicraft-logo-veg-thali-text-logo.png" width="70" height="70" style="display: block; border: 0px;"/> </td> </tr> <tr> <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;"> <p style="font-size: 14px; font-weight: 800; line-height: 18px; color: #333333;">Madhovastika Rajmohall<br>Indore (MP) 452009 </p> </td> </tr> <tr> <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px;"> <p style="font-size: 14px; font-weight: 400; line-height: 20px; color: #777777;"></p>'

            };
            transporter.sendMail(mailData, (error, info) => {
                if (error) {
                    return console.log(error);
                }
                return response.status(200).send({ message: "Mail send", message_id: info.messageId });
            });
            return response.status(200).json({ orderdetail: order, orderitems: orderitems, status: true })
        }
    } catch (err) {
        return response.status(500).json({ error: err })
    }
}
export const orderDetailsByCustomerIdorOrderId = async (request, response, next) => {
    try {
        const customer = await Customer.findById({ _id: request.body.id }) || await Order.findById({ _id: request.body.id })
        if (!customer)
            return response.status(401).json({ message: "invalid user" })
        else {

            const order = await Order.find({ $or: [{ customerid: request.body.id }, { _id: request.body.id }] }).populate({
                path: "orderItem",
                populate: { path: "product" }

            })
            const ordercount = await Order.count({ customerid: request.body.id })
            if (order.length == 0)
                return response.status(200).json({ message: "NO order Found",status:false });

            const customer = await Customer.findById({ _id: request.body.id }) || await Order.findById({ _id: request.body.id })
            if (!customer)
                return response.status(401).json({ message: "invalid user" })
            else {
                const order = await Order.find({ $or: [{ customerid: request.body.id }, { _id: request.body.id }] }).populate({
                    path: "orderItem",
                    populate: { path: "product" }
                })
                if (order.length == 0)
                    return response.status(401).json({ message: "NO order Found",status:false });

                return response.status(200).json({ order, status: true })
            }
        }
    }

    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
}

export const updateOrder = async (request, response, next) => {
    try {
        let order = await Order.findById(request.params.orderId)
        if (!order)
            return response.status(401).json({ message: "Order ID nor found" })
        if (order.status == "shipped")
            return response.status(200).json({ status: "Order has already shipped" })
        order = await Order.findByIdAndUpdate(
            request.params.orderId,
            {
                status: "shipped"
            }, { new: true }
        )
        return response.status(200).json({ Order: order, status: true })
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "Internal Server Error" })

    }
}

export const allOrder = async (request, response, next) => {
    try {
        let allOrders = await Order.find()
        return response.status(200).json({ orders: allOrders, status: true });
    } catch (err) {
        return response.status(500).json({ error: "Internal Server", status: false });
    }
}

export const orderDetailsBySeller = async (request, response, next) => {
    Order.aggregate([
        {
            $unwind: "$orderItem"
        },
        {
            $lookup: {
                localField: 'orderItem',
                foreignField: '_id',
                from: 'orderitems',
                as: 'OrderItems'
            }
        },
        {
            $unwind: "$OrderItems"
        },
        {
            $lookup: {
                localField: 'OrderItems.product',
                foreignField: '_id',
                from: 'products',
                as: "productDetails"
            }
        },
        {
            $unwind: "$productDetails"
        },
        {
            $addFields: {
                sellerId: "$productDetails.sellerId"
            }
        },
        {
            $match: { sellerId: new mongoose.Types.ObjectId('' + request.params.id) }
        }
    ]).then(result => {
        return response.status(200).json({ sellerOrder: result, status: true });
    }).catch(err => {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    });
}



export const orderDetailsByCustomerorOrderId = async (request, response, next) => {
    try {
        const orders = await Order.findById({ _id: request.body.id })
        if (!orders)
            return response.status(401).json({ message: "invalid user" })
        else {
            const order = await Order.find({ $or: [{ _id: request.body.id }] }).populate({
                path: "orderItem",
                populate: { path: "product" }
            })
            const ordercount = await Order.count({ customerid: request.body.id })
            if (order.length == 0)
                return response.status(401).json({ message: "NO order Found" });
            const orderItem = await Order.findById({ _id: request.body.id })
            if (!orderItem)
                return response.status(401).json({ message: "invalid user" })
            else {
                const order = await Order.find({ $or: [{ _id: request.body.id }] }).populate({
                    path: "orderItem",
                    populate: { path: "product" }
                })
                if (order.length == 0)
                    return response.status(401).json({ message: "NO order Found" });
                return response.status(200).json({ order, status: true })
            }
        }
    }
    catch (err) {
        console.log(err)
        return response.status(500).json({ error: "INTERNAL SERVER ERROR" })
    }
}


