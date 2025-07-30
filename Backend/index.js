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



app.use(express.json({limit:"200kb"}));
app.use(express.urlencoded({extended:true, limit:"200kb"}))



// Route

import userRoute from "../Backend/Routes/userRoutes.js"

// api Version Routes

app.use("/api/user",userRoute)