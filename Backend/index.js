import express from "express";
import connectDb from "./database/db.js";
import dotenv from "dotenv";
import cors from "cors";


// express app 
const app = express();

// config .env
dotenv.config();


// config cors
const allowedOrigins = [
  'http://localhost:5173',
  // live server url
  // 'https://clickurl-r72u.onrender.com'
]; 

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));


// Port 
const port = process.env.PORT || 8001;

// Connecting database
connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`);
    });
}).catch(err => {
    console.error("Failed to connect to DB:", err);
});



app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true, limit:"10mb"}))



// Route
import userRoute from "../Backend/Routes/userRoutes.js"
import productRoute from "../Backend/Routes/productRoutes.js"
import cartRoute from "../Backend/Routes/cartRoutes.js";
import checkoutRoute from "../Backend/Routes/checkoutRoutes.js"    
import orderRoute from "../Backend/Routes/orderRoutes.js"
import uploadRoute from "../Backend/Routes/uploadRoutes.js"
import subscriber from "../Backend/Routes/subscriberRoutes.js"
import adminRoutes from "../Backend/Routes/adminRoutes.js"
import adminProduct from "../Backend/Routes/productAdminRoutes.js"
import adminOrder from "../Backend/Routes/adminOrderRoutes.js"
import paymentRoute from "../Backend/Routes/paymentRoutes.js"



// api Version Routes
app.use("/api/user",userRoute)
app.use("/api/products",productRoute)
app.use("/api/cart",cartRoute)
app.use("/api/checkout",checkoutRoute)
app.use("/api/order",orderRoute)
app.use("/api/upload",uploadRoute)
app.use("/api/subscribe",subscriber)
app.use("/api/admin",adminRoutes)
app.use("/api/admin/product",adminProduct)
app.use("/api/admin/order",adminOrder)
app.use("/api/payment",paymentRoute)

