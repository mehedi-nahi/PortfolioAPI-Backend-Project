const dotENV= require("dotenv");
dotENV.config()


const express= require("express");
const rateLimit = require("express-rate-limit");
const helmet    = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp= require("hpp");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const mongoose= require("mongoose");

const router= require("./src/routes/api.js");


const app= express();

app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());
app.use(express.json({ limit: '10mb'}));
app.use(express.urlencoded({ limit: '10mb'}));




//Database Connection

let url="mongodb+srv://Nahi:01531949342@cluster0.no97x.mongodb.net/PortfolioAPI"

let option = {
    user: process.env.DB_USER,
    pass: process.env.DB_PASS,
    autoIndex:true,
    serverSelectionTimeoutMS: 50000
};

mongoose.connect(url)
    .then((res)=>{
        console.log("Database connected successfully");
    }).catch((err)=>{
        console.log("Database connection failed:", err);
    });

const limiter= rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});

app.use(limiter);

// api end point tag
app.use("/api/v1",router);

app.use(express.static("client"));
app.use("/api/v1/get-file", express.static("uploads"));

module.exports= app;