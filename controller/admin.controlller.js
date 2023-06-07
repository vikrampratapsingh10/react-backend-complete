import bcrypt from "bcryptjs";
import { validationResult } from "express-validator";
import { Admin } from "../model/admin.model.js";
import Jwt from "jsonwebtoken";
import { Seller } from "../model/seller.model.js";
import { Customer } from "../model/customer.model.js";
import { Order } from "../model/order.model.js";


export const signUp = async (request, response, next) => {
    const errors = await validationResult(request);
    if (!errors.isEmpty())
        return response.status(400).json({ error: "Bad request", message: errors.array() })
    let saltkey = await bcrypt.genSalt(10);
    request.body.password = await bcrypt.hash(request.body.password, saltkey);
    let admin = Admin.create(request.body)
        .then(result => {
            return response.status(200).json({ Admin: result, status: true })
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}

export const googleSignIn = async (request, response) => {
    try {
        let admin = await Admin.find({ email: request.body.email });
        // console.log(admin);
        if (admin.length)
            return response.status(200).json({ status: true, msg: "SignIn Success", admin });
        return response.status(400).json({ status: false, msg: "No email matched" });
    } catch (err) {
        return response.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}
export const signIn = async (request, response, next) => {
    try {
        let admin = await Admin.findOne({ email: request.body.email });
        if (admin) {
            let status = await bcrypt.compare(request.body.password, admin.password);
            if (status) {
                let payload = { subject: Admin.email };
                let token = Jwt.sign(payload, 'fkjdfhfflfglkfaslfgdlf')
                admin = admin.toObject();
                delete admin.password;
                console.log(admin);
                return status ? response.status(200).json({ message: "signin seccess", token: token, status: true, admin: { ...admin, password: undefined } }) : response.status(400).json({ error: "Bad request", status: false });
            }
            else
                return response.status(401).json({ error: "Unauthorized user", status: false });
        }
        else
            return response.status(401).json({ error: "Unauthorized user", status: false });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}
export const sellerApproval = async (request, response, next) => {
    const seller = await Seller.findByIdAndUpdate(request.params.id, {
        status: "Active"
    }
    )
    if (!seller)
        return response.status(400).send('this seller cannot fount...')
    return response.status(200).json({ message: "successfull approvel... ", status: true });
}
export const sellerInActive = async (request, response, next) => {
    const seller = await Seller.findByIdAndUpdate(request.params.id, {
        status: "Inactive"
    }
    )
    if (!seller)
        return response.status(400).send('this seller cannot fount...')
    return response.status(200).json({ message: "successfull approvel... ", status: true });
}

export const customerCount = (request, response, next) => {
    Customer.find()
        .then(result => {
            return response.status(200).json({ customer: result, status: true });
        })
        .catch(function (err) {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const sellerCount = (request, response, next) => {
    Seller.find()
        .then(result => {
            return response.status(200).json({ seller: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const sellerDeactive = (request, response, next) => {
    try {
        const count = Seller.find()
        if (count.status == "Deactive")
            return response.status(200).json({ seller: count, status: true });
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    }
}

export const orderCount = (request, response, next) => {
    Order.find()
        .then(result => {
            return response.status(200).json({ orders: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        });
}

export const SellerViewCustomer = (request, response, next) => {
    Customer.findOne({ _id: request.params.customerId })
        .then(result => {
            console.log(result)
            return response.status(200).json({ customers: result, status: true });
        })
        .catch(err => {
            console.log(err);
            return response.status(500).json({ error: "Internal server error", status: false });
        })
}
