const express= require("express");
const rateLimit = require("express-rate-limit");
const helmet    = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const hpp= require("hpp");
const cors= require("cors");
const cookieParser = require("cookie-parser");
const mongoose= require("mongoose");
const dotENV= require("dotenv");

dotENV.config()

const app= express();

app.use(cookieParser());
app.use(helmet());
app.use(mongoSanitize());
app.use(hpp());
app.use(cors());

const limiter= rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

//Database Connection

let url="mongodb+srv://Nahi:01531949342@cluster0.no97x.mongodb.net/"

let option = {
    user: "Nahi",
    pass: "01531949342",
    dbName: "Cluster0"
}

app.use(express.json());


