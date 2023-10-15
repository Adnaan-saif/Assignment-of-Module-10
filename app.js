const express = require('express');
const router = require('./src/routes/api');
const app = new express();
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const hpp = require('hpp');
const cors = require('cors');
const mongoose = require('mongoose');

app.use(cors())
app.use(helmet())
app.use(mongoSanitize())
app.use(hpp())

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
const limiter = rateLimit({windowMs:15*60*1000,max:3000})
app.use(limiter)

let URI = "mongodb+srv://adnaanSaif:<password>@cluster0.9lwqvdx.mongodb.net/CURD";
let OPTION = {user:'testuser789',pass:'testuser789',autoIndex:true}
mongoose.connect(URI,OPTION);

app.use("/api/v1",router)
app.use("*",(req,res)=>{
    res.status(404).json({status:"fail",data:"Not Found"})
})

module.exports = app;
















