const key = process.env.JWT_SECRET_KEY;

const database = require("../models/admin");
const sendMail = require("../middleware/email_connector");
const jwt_generate = require("../middleware/auth");

exports.userlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const ext_doc = await database.findOne({ email: email });
    if (ext_doc && ext_doc.status === "Active") {
      if (ext_doc.password === password) {
        // generating jwt token
        const token = jwt_generate.jwt_generate(ext_doc._id);
        console.log("token: ", token);
        res.send({
          status: true,
          msg: "Your account is active",
          data: token,
        });
      } else {
        res.send("Please enter the correct password");
      }
    } else {
      res.send({
        status: false,
        msg: "Your data is not registered. Kindly register.",
      });
    }
  } catch (error) {
    console.log("Error:", error);
  }
};

// otp verify
exports.otp_verify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const ext_doc = await database.findOne({ email: email });

    if (ext_doc && ext_doc.otp === otp) {
      database
        .updateOne({ email: email }, { $set: { status: "Active" } })
        .then((ext_doc) => {
          console.log("ext_doc: ", ext_doc);
        })
        .catch((err) => {
          console.log("err: ", err);
        });
      console.log("otp verified");
      res.send({ status: true, msg: "otp verified successfully" });
    } else {
      if (ext_doc.otp === "expired") {
        const newotpExpirationTime = 30 * 1000;
        const new_otp_generate = Math.floor(Math.random() * 8999 + 1000 ).toString();
        console.log("OTP:", new_otp_generate);
        database.findOneAndUpdate({ email: email },{$set: {otp: new_otp_generate,expirationTime: newotpExpirationTime}})
          .then((result) => {
            // if (result) {
              sendMail.send_email(object.email, new_otp_generate);
              res.json({ status: true,msg: "User created successfully",data: result})
              if (ext_doc && ext_doc.otp === otp) {
                database
                  .updateOne({ email: email }, { $set: { status: "Active" } })
                  .then((ext_doc) => {
                    console.log("ext_doc: ", ext_doc);
                  })
                  .catch((err) => {
                    console.log("err: ", err);
                  });
                console.log("otp verified");
                res.send({ status: true, msg: "otp verified successfully" });}
            // } else {
            //   console.log("No OTP");
            // }
          })
          .catch((err) => {
            console.log("err: ", err);
            console.error("err:", err);
          });
      }
      console.log("OTP is incorrect or expired. Please try again.");
      res.send("OTP is incorrect or expired. Please try again.");
    }
  } catch (error) {
    console.log("error:", error);
    res.status(500).json({ status: false, msg: "An error occurred" });
  }
};

// Register method
exports.userRegister = async (req, res) => {
  const otpExpirationTime = 30 * 1000;
  const otp_generate = Math.floor(Math.random() * 8999 + 1000).toString();
  
  try {
    const object = {
      name: req.body.name,
      email: req.body.email,
      phone_number: req.body.phone_number,
      password: req.body.password,
      otp: otp_generate,
      expirationTime: otpExpirationTime,
    };
    const result = database.create(object);

    setTimeout(() => {
      if (Date.now() > otpExpirationTime) {
        database
          .findOneAndUpdate({ otp: object.otp }, { $set: { otp: "expired" } })
          .then((obj) => {
            if (obj) {
              console.log("OTP expired");
            } else {
              console.log("No OTP");
            }
          })

          .catch((err) => {
            console.log("err: ", err);
            console.error("err:", err);
          });
      }
    }, 30 * 1000);

    if (result) {
      sendMail.send_email(object.email, otp_generate);

      res.json({
        status: true,
        msg: "User created successfully",
        data: result,
      });
    } else {
      res.json({ status: false, msg: "User not saved", data: [] });
    }
  } catch (error) {
    console.log("error:", error);
    res.json({ status: false, msg: "Your data is not saved", error });
  }
};

const client = require("../models/user");

exports.add_users = async (req, res) => {
  try {
    const info = req.body;
    const user = {
      name: info.name,
      email: info.email,
      emp_Id: info.emp_Id,
      role: info.role,
      salary: info.salary,
    };
    const result = await client.create(user);
    if (result) {
      res.send({ status: true, msg: "user created successfully" });
    } else {
      res.send({ status: false, msg: "users not created" });
    }
  } catch (error) {
    console.log("error: ", error);
  }
};

// // register method
// exports.userRegister = async (req, res) => {
//   try {

//     // const otp_generate = Math.floor(Math.random() * 8999 + 1000).toString();
//     // console.log("otp:", otp_generate);
//     const object = {
//       name: req.body.name,
//       email: req.body.email,
//       phone_number: req.body.phone_number,
//       password: req.body.password,
//       otp: otp_generate,
//     };
//     const result = await database.create(object);

//     if (result) {
//       helper.send_email(req.body.email , otp_generate); // Assuming send_email function sends OTP to the provided email

//       res.json({
//         status: true,
//         msg: "User created successfully",
//         data: result,
//       });
//     } else {
//       res.json({ status: false, msg: "User not saved", data: [] });
//     }
//   } catch (error) {
//     console.log("error:", error);
//     res.json({ status: false, msg: "Your data is not saved", error });
//   }
// };

// // exports.otp_verify

// const database = require("../models/data");

// const helper = require("../middleware/connector");
// const { search } = require("../routes/router");
// const nodemailer = require("nodemailer");
// const sendMail = require ("../middleware/connector")

// // user login
// exports.userlogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     database.findOne({ email: email }).then((ext_doc) => {
//       var object = { email: ext_doc.email };
//       if (ext_doc) {
//         if (ext_doc.password === password) {
//           // jwt token generation in this line

//           console.log("login successfully");
//           res.send({ status: true, msg: "login successfully" });
//         } else {
//           res.send("Please enter the correct password.");
//         }
//       } else {
//         console.log("Your data is not registered. Please register.");
//         res.send("Your data is not registered. Please register.");
//       }
//     });
//   } catch (error) {
//     console.log("error: ", error);
//   }
// };

// //register method
// exports.userRegister = async (req, res) => {
//   try {
//     const otp_generate = Math.floor(Math.random() * 8999 + 1000).toString();
//     console.log("otp: ", otp_generate);
//     const newotp = otp_generate;
//     console.log("newotp: ", newotp);
//     const object = {
//       name: req.body.name,
//       email: req.body.email,
//       phone_number: req.body.phone_number,
//       password: req.body.password,
//       otp: otp_generate,
//     };
//     const result = database.create(object);
//     if (result) {

//       var sendMail = helper.send_email();

//       res.json({
//         status: true,
//         msg: "User created successfully",
//         data: result,
//       });
//     } else {
//       res.json({ status: false, msg: " User not saved ", data: [] });
//     }
//   } catch (error) {
//     console.log("error: ", error);
//     res.json({ status: false, msg: " your data is not saved ", error });
//   }
// };
