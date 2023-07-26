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



