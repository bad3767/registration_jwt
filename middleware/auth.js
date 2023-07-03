const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET_KEY;
const os = require("os");


exports.get_details = (req, res, next) => {
  const interfaces = os.networkInterfaces();

  for (const interfaceName of Object.keys(interfaces)) {
    const addresses = interfaces[interfaceName];

    for (const address of addresses) {
      if (address.family === "IPv4" && !address.internal) {
        return address.address;
      }
    }
  }
};

exports.jwt_generate = (key) => {
  const jwt_generation = { subject: key };
  const token = jwt.sign(jwt_generation, secretKey);
  return token;
};

exports.jwt_verification = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(" ")[1];
    if (token != null) {
      jwt.verify(token, secretKey, (err, jwt_generation) => {
        if (jwt_generation) {
          let userid = jwt_generation.subject;
          req.userId = userid;
          next();
        } else {
          res.json({ status: false, message: "Unauthorized" });
        }
      });
    } else {
      res.json({ status: false, message: "Unauthorized" });
    }
  } else {
    res.json({ status: false, message: "Unauthorized" });
  }
};
















// exports.validation = (req, res) => {
//   let tokenHeaderKey = process.env.TOKEN_HEADER_KEY;
//   let jwtSecretKey = process.env.JWT_SECRET_KEY;

//   try {
//     const token = req.header(tokenHeaderKey);

//     const verified = jwt.verify(token, jwtSecretKey);
//     if (verified) {
//       return res.send("Successfully Verified");
//     } else {
//       // Access Denied
//       return res.status(401).send(error);
//     }
//   } catch (error) {
//     // Access Denied
//     return res.status(401).send(error);
//   }
// };

// exports.decode = async (req, res) => {
//   try{
//         let decode = jwt_generate.jwt_verification(req.headers.authorization.split(' ')[1])
//         let email = decode.subject.email;
//         console.log('email: ', email);
//       }catch{

//       }
// }

// exports.jwtDecode = (token) => {

//   var decoded = jwt_decode(token);

//   return decoded
// }

// exports.jwt_verification = (req, res, next) => {
//   if (req.headers.authorization) {
//     let token = req.headers.authorization.split(' ')[1];
//     if (token != null) {
//       try {
//         jwt.verify(token, secretKey, (err, decoded) => {
//           if (err) {
//             res.status(401).json({ status: false, message: "Invalid token" });
//           } else {
//             req.userId = decoded.subject;
//             next();
//           }
//         });
//       } catch (err) {
//         res.status(401).json({ status: false, message: "Invalid token" });
//       }
//     } else {
//       res.status(401).json({ status: false, message: "Unauthorized" });
//     }
//   } else {
//     res.status(401).json({ status: false, message: "Unauthorized" });
//   }
// };

// const jwt = require('jsonwebtoken');
// const secretKey = 'hgzvsfdbcik@3#$'; // Replace with your own secret key
// const payload = { userId: 12345 }; // Example payload, you can customize it according to your needs
// const token = jwt.sign(payload, secretKey);

// const jwt = require("jsonwebtoken");
// const secretKey = "your_secret_key";
// const payload = { sub: "your_user_id", iat: Date.now() };
// const token = jwt.sign(payload, secretKey);
// console.log(token);

// const secretKey = "sdfghjk,mnbvfghj#$%vhfjhkbj15"
// const keyfile = require("../config/keyfile");

// exports.jwt_verification = (req, res, next) => {
//   if (req.headers.authorization) {
//     let token = req.headers.authorization.split(' ')[1];
//     if (token != null) {
//       jwt.verify(token, secretKey, (err, payload) => {
//         if (payload) {
//           let userid = payload.subject
//           req.userId = userid;
//           next();
//         } else {
//           res.json({ "status": false, "message": "Unauthorized" })
//         }
//       })
//     } else {
//       res.json({ "status": false, "message": "Unauthorized" })
//     }
//   } else {
//     res.json({ "status": false, "message": "Unauthorized" })
//   }
// }
