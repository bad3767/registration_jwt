const express = require("express");
const router = express.Router();
const controller = require("../controller/views");
const jwt = require("../middleware/auth")

router.post("/register", controller.userRegister);
router.post("/login",jwt.verifyPayload, controller.userlogin);
router.post("/otp_verify", controller.otp_verify);

module.exports = router;
