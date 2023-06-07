import dbConfig from "../db/dbConfig.js";
import { Customer } from "../model/customer.model.js";
import bcrypt from "bcryptjs";
import Jwt from "jsonwebtoken";

export const SignIn = async (request, response, next) => {
    try {
        let responseType = false;
        let customer = await Customer.findOne({ customerEmail: request.body.customerEmail });
        responseType = customer ? true : false;
        let status = responseType ? await bcrypt.compare(request.body.customerPassword, customer.customerPassword) : false;
        if (status) {
            let payload = { subject: Customer.customerEmail }
            let token = Jwt.sign(payload, 'fdgljfiofojffjdfjdfkjof')
            customer = customer?.toObject();//make an object
            delete customer?.customerPassword;
            return status ? response.status(200).json({ message: "SignIn Successful", token: token, status: true, customer: { ...customer, customerPassword: undefined } }) : response.status(400).json({ error: "Bad request", status: false });
        }
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server error", status: false });
    }
}

export const SingUp = async (request, response, next) => {
    // console.log(" sign up called");
    try {
        console.log("called");
        let saltkey = await bcrypt.genSalt(10);
        let encryptedPassword = await bcrypt.hash(request.body.customerPassword, saltkey);
        request.body.customerPassword = encryptedPassword;

        let customer = await Customer.create(request.body)
        return response.status(200).json({ message: "SignUp Successful", customer: customer, status: true });
    } catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal Server Error", status: false });
    }
}

export const UploadImg = async (request, response, next) => {
    try {
        let image = request.file?.filename;  
        console.log (image);
        let data = await Customer.findOneAndUpdate({_id:request.body.customerId},{customerImage : image});
        return response.status(200).json({Message : "Image upadated successfully",status:true})

    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ error: "Internal server error", status: false });
    
    }
}

export const googleSignIn = async (request, response) => {
    try {
        let customer = await Customer.find({ customerEmail: request.body.email });
        // console.log(customer);
        if (customer.length)
            return response.status(200).json({ status: true, msg: "SignIn Success", customer });
        return response.status(400).json({ status: false, msg: "No email matched" });
    } catch (err) {
        return response.status(500).json({ status: false, msg: "Internal Server Error" });
    }
}






