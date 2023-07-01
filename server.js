// import express
const express = require("express");
const cookieParser=require('cookie-parser')
const app = express();
const jwt = require('jsonwebtoken');
require('dotenv').config();

// email lib file import
const nodemailer = require("nodemailer");

// redirect to router
const userRouter = require("./routes/router");

// database connection
const mongoose = require("mongoose");
const data = "mongodb://localhost:27017/email_otp";
mongoose
  .connect(data)
  .then(() => {
    console.log("connect successfully");
  })
  .catch((error) => {
    console.log("connection failed ", error);
  });

// for json response

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cookieParser());
const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// URLs for the router
app.use("/user", userRouter);

// port configuration with env
const port = process.env.PORT;
app.listen(port, function () {
  console.log("localhost:" + port);
});
