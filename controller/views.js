// env file
const key = process.env.JWT_SECRET_KEY;
// database collection
const database = require("../models/admin");
const client = require("../models/user");
const login = require("../models/login");
// middleware
const sendMail = require("../middleware/email_connector");
const changePass = require("../middleware/forgot_password");
const jwt_generate = require("../middleware/auth");
const pc_details = require("../middleware/auth");
// require file
const os = require("os");
const moment = require("moment");
const { time } = require("console");
var cron = require("node-cron");

exports.userlogin = async (req, res) => {
  time1 = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
  const ipAddress = pc_details.get_details();
  const operatingSystem = os.platform();
  console.log("operatingSystem: ", operatingSystem);
  const Ip = ipAddress;
  try {
    const { email, password } = req.body;

    const ext_doc = await database.findOne({ email: email });
    if (ext_doc.status === "Active" && ext_doc.password === password) {
      const login_user = {
        role: req.body.role,
        loginTime: time1,
        os: operatingSystem,
        Ip_address: Ip,
        emp_Id: ext_doc._id,
        emolyees_Id: req.body.emolyees_Id,
      };
      const result = await login.create(login_user);
      if (result) {
        console.log("result: ", result);
      } else {
        console.log("login not created");
      }
      database
        .updateOne({ email: email }, { $set: { otp: "expired" } })
        .then((ext_doc) => {
          if (ext_doc) {
            console.log("ext_doc: ", ext_doc);
          } else {
            console.log("error");
          }
          const token = jwt_generate.jwt_generate(ext_doc._id);
          console.log("token: ", token);
          res.send({
            status: true,
            msg: "Your account is active",
            data: token,
          });
        })
        .catch((error) => {
          console.log("error: ", error);
        });
      // }
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
        const new_otp_generate = Math.floor(
          Math.random() * 8999 + 1000
        ).toString();
        console.log("OTP:", new_otp_generate);
        database
          .findOneAndUpdate(
            { email: email },
            {
              $set: {
                otp: new_otp_generate,
                expirationTime: newotpExpirationTime,
              },
            }
          )
          .then((result) => {
            // if (result) {
            sendMail.send_email(object.email, new_otp_generate);
            res.json({
              status: true,
              msg: "User created successfully",
              data: result,
            });
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
              console.log("No OTP");
            }
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

exports.user_login = async (req, res) => {
  try {
    const info = req.body;
    const user_details = {
      name: info.name,
      email: info.email,
      employees_Id: info.employees_Id,
      domain: info.domain,
    };

    const result = await login.findOneAndUpdate(
      { employees_Id: info.employees_Id },
      { $set: user_details },
      { new: true, upsert: true }
    );

    if (result) {
      console.log("result: ", result);
      res.send({ status: true, msg: "User login successful" });
    } else {
      res.send({ status: false, msg: "User not registered" });
    }
  } catch (error) {
    console.log("error: ", error);
    res.json({ status: false });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const password_generate = Math.random().toString(36).slice(-8);

    console.log("password_generate: ", password_generate);

    var object = {
      email: req.body.email,
      password: password_generate,
    };
    console.log("object.email", object.email);
    var result = await database.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: password_generate } },
      { new: true }
    );
    if (result) {
      cron.schedule("*/5 * * * *", () => {
        console.log("running a task every minute");

        changePass.send_email(object.email, password_generate);
      });
      res.json({
        status: true,
        msg: "password generate successfully",
        data: result,
      });
    } else {
      res.json({ status: false, msg: "User not saved", data: [] });
    }
  } catch (error) {
    console.log("error: ", error);
    res.send({ status: false, msg: "error", data: error });
  }
};
exports.reset_password = async (req, res) => {
  try {
    var object = {
      email: req.body.email,
      current_password: req.body.current_password,
      new_password: req.body.new_password,
      confirm_password: req.body.confirm_password,
    };
    var result = await database
      .findOne({ email: req.body.email })
      .then((result) => {
        if (result.password == req.body.current_password) {
          if (req.body.new_password == req.body.confirm_password) {
            var result = database
              .findOneAndUpdate(
                { email: req.body.email },
                { $set: { password: req.body.new_password } },
                { new: true }
              )
              .then((result) => {
                console.log("result: ", result);
                res.json({
                  status: true,
                  msg: "password reset successfully",
                  data: result,
                });
              })
              .catch((error) => {
                console.log("error: ", error);
                res.json({
                  status: false,
                  msg: "password not reset ",
                  data: error,
                });
              });
          } else {
            console.log("error: ", error);
          }
        } else {
          console.log("error: ", error);
        }
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  } catch {}
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
