const rateLimit = require("express-rate-limit");
const accesscontrol = require('express-ip-access-control');




// hitting limit 
exports.limiter = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000, // 1 hour
  message:
    "You are hitting this endpoint too frequently. Please try again after a while.",
});


// rough specifc ip address can access
exports.accessCon = accesscontrol({
  allow: ["192.168.230.46"],
  deny: ["192.168.1.100", "10.0.0.0/8"],

  unauthorized: (req, res) => {

    res.status(403).json({ error: "Unauthorized IP address" });

  },
});


// IP : 192.168.230.46
exports.authorizedPC = async (req, res,next) => {
  const clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

  if (clientIp == '192.168.230.46') {
    next();
    // res.json({status:true,msg:"premission granted",data:clientIp})
  } else {
    res.status(403).json({ error: 'Permission denied. Access only from authorized PC.' });
  }
};