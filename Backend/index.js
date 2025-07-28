import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect_db from "./Database/db.js";


// config .env
dotenv.config();

// express appp
const app = express();


// config cors

const allowedOrigins = [
    "http://localhost:5173",
    // server depoyment link
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not Allowed by Cors"));
            }
        },
        credentials: true,
    })
);

// Running Port

const PORT = process.env.PORT || 8001;

//  Connecting database

connect_db()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is Now Running on This ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to Connect to Database", err);
    });

app.use(express.json({ limit: "200kb" }));
app.use(express.urlencoded({ extended: true, limit: "200kb" }));

// Route

//  Route Api version
