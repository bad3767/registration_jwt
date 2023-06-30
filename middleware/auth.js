// const jwt = require('jsonwebtoken');
// const secretKey = 'hgzvsfdbcik@3#$'; // Replace with your own secret key
// const payload = { userId: 12345 }; // Example payload, you can customize it according to your needs
// const token = jwt.sign(payload, secretKey);

const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key";
const payload = { sub: "your_user_id", iat: Date.now() };
const token = jwt.sign(payload, secretKey);
console.log(token);

// const keyfile = require("../config/keyfile");
// const jwt = require("jsonwebtoken");

// const secretKey = keyfile.JWT_SECRET;

// exports.jwt_generate = (key) => {
//   const jwt_generation = { subject: key };
//   const token = jwt.sign(jwt_generation, secretKey);
//   return token;
// };
