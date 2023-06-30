const express = require("express");
const router = express.Router();
const controller = require("../controller/views");
// const jwt = require("../middleware/connector")

router.post("/register", controller.userRegister);
router.post("/login", controller.userlogin);
router.post("/otp_verify", controller.otp_verify);

module.exports = router;
