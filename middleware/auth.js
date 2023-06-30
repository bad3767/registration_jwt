// const jwt = require('jsonwebtoken');
// const secretKey = 'hgzvsfdbcik@3#$'; // Replace with your own secret key
// const payload = { userId: 12345 }; // Example payload, you can customize it according to your needs
// const token = jwt.sign(payload, secretKey);

// const jwt = require("jsonwebtoken");
// const secretKey = "your_secret_key";
// const payload = { sub: "your_user_id", iat: Date.now() };
// const token = jwt.sign(payload, secretKey);
// console.log(token);

// const keyfile = require("../config/keyfile");
const jwt = require("jsonwebtoken");

const secretKey = "sdfghjk,mnbvfghj#$%vhfjhkbj15"

exports.jwt_generate = (key) => {
  const jwt_generation = { subject: key };
  const token = jwt.sign(jwt_generation, secretKey);
  return token;
};

exports.verifyPayload = (req, res, next) => {
  if (req.headers.authorization) {
    let token = req.headers.authorization.split(' ')[1];
    if (token != null) {
      jwt.verify(token, secretKey, (err, payload) => {
        if (payload) {
          let userid = payload.subject
          req.userId = userid;
          next();
        } else {
          res.json({ "status": false, "message": "Unauthorized" })
        }
      })
    } else {
      res.json({ "status": false, "message": "Unauthorized" })
    }
  } else {
    res.json({ "status": false, "message": "Unauthorized" })
  }
}
