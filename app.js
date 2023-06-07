import cors from "cors"
import express from "express";
import bodyParser from "body-parser";
import SellerRouter from "./routes/seller.route.js";
import ProductRouter from "./routes/product.route.js";
import AdminRouter from "./routes/admin.js";
import CategoryRouter from "./routes/category.route.js";
import CustomerRouter from "./routes/customer.route.js";
import CartRouter from "./routes/cart.route.js";
import OrderRouter from "./routes/order.route.js";
import WishlistRouter from './routes/wishlist.route.js';
import path from "path";
import { fileURLToPath } from 'url';
import paymentRoute from "./routes/payment.route.js";


import multer from "multer";


const app = express();
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/",(req,res,next)=>{
  res.setHeader("Access-Control-Allow-Credentials",true);
  res.send("API is running...")
});
app.use("/customer", CustomerRouter);
app.use("/product", ProductRouter);
app.use("/cart", CartRouter);

app.use("/seller", SellerRouter);
app.use("/product", ProductRouter);
app.use("/admin", AdminRouter);
app.use("/category", CategoryRouter);
app.use("/order", OrderRouter);
app.use('/wishlist', WishlistRouter);

const publicPath = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
app.use(express.static(publicPath));
app.use("/api", paymentRoute);
app.get("/api/getkey", (req, res) =>
  res.status(200).json({ key: "rzp_test_mkdEsKQeQYTu1W" })
);
const upload = multer({ dest: 'uploads/' }); // Set the destination directory for uploaded files
app.post('/image', upload.any('files'), (req, res) => {
  try {
    // Access the file data using req.file
    const file = req.files;
    console.log('File uploaded:', file);
    // Send a response to the client
    res.status(200).send('File uploaded successfully');
  } catch (error) {
    console.error('Error uploading file', error);
    res.status(500).send('Error uploading file');
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

